const { UnAuthorized } = require("../libs/errors");

exports.role = (requiredRole) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (userRole !== requiredRole) {
        throw new UnAuthorized("Insufficient permissions");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
