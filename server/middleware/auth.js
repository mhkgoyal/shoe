const user = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const asyncErrorHandler = require("./asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");

const adminOnly = asyncErrorHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new errorHandler("Authorization header is missing", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) return next(new errorHandler("Token not found", 401));
  console.log(token);

  const { id, email } = jwt.verify(token, secret);
  const newUser = await user.findOne({ _id: id, email });
  if (!newUser) return next(new errorHandler("Invalid User", 401));

  console.log(newUser.role, "role", newUser.role === "admin");
  if (newUser.role !== "admin") {
    return next(new errorHandler("You are not authorized", 403));
  }

  req.tokenId = id;
  req.tokenEmail = email;
  next();
});

const verifyToken = asyncErrorHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new errorHandler("Authorization header is missing", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) return next(new errorHandler("Token not found", 401));

  const { id, email } = jwt.verify(token, secret);
  req.tokenId = id;
  req.tokenEmail = email;
  next();
});

module.exports = { adminOnly, verifyToken };

