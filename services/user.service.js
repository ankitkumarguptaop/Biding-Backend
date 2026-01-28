const {
  BadRequest,
  ForBidden,
  UnAuthorized,
  NoContent,
} = require("../libs/errors.js");
const { userRepository } = require("../repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../configs/cloudinary");

exports.signUp = async (payload) => {
  const { name, email, password } = payload.body;

  if (!name || !email || !password) {
    throw new BadRequest("data is not given");
  }

  if (await userRepository.findOne({ email: email })) {
    throw new ForBidden("User already exists");
  }
  let imageUrl = null;
  if (payload?.file) {
    try {
      const result = await uploadToCloudinary(payload.file.buffer);
      imageUrl = result.secure_url;
    } catch (error) {
      throw new BadRequest("Failed to upload image: " + error.message);
    }
  }

  const user = await userRepository.create({
    name: name,
    email: email,
    password: password,
    image: imageUrl, 
  });

  if (!user) {
    throw new NoContent("User creation failed");
  }

  return user;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

exports.signIn = async (payload) => {
  const { email, password } = payload.body;

  if (!email || !password) {
    throw new BadRequest("data is not given");
  }

  const user = await userRepository.findOne({ email: email });
  if (!user) {
    throw new UnAuthorized("Need to register first");
  }
  const validate = await bcrypt.compare(password, user.password);

  if (!validate) {
    throw new UnAuthorized("Unauthorised access Password not matched!");
  }

  return {
    token: generateToken(user.id),
    user: user,
  };
};
