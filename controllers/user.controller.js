const { userService } = require("../services");

exports.signUp = async (req, res, next) => {
  try {
    const user = await userService.signUp(req);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image : user.image
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const result = await userService.signIn(req);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token: result.token,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          image:result.user.image
        },
        profileImage: result.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};