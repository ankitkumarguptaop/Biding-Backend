

const jwt = require("jsonwebtoken");

exports.socketAuthMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
};
