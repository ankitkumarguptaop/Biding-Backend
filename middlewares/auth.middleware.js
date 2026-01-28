
const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../libs/errors");
const { userRepository } = require("../repositories");

exports.auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      throw new UnAuthorized("No token provided");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await userRepository.findOne({ id: decoded.id });

    if (!user) {
      throw new UnAuthorized("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new UnAuthorized("Invalid token"));
    } else if (error.name === "TokenExpiredError") {
      next(new UnAuthorized("Token expired"));
    } else {
      next(error);
    }
  }
};