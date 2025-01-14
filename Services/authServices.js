import asyncHandler from "express-async-handler";
import userSchema from "../Models/userSchema.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import ApiError from "../Utils/ApiError.js";

export const signup = asyncHandler(async (req, res) => {
  const user = await userSchema.create(req.body);

  const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(201).json({
    status: "success",
    data: user,
    token,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });

  if (!user || !(await bcryptjs.compare(password, user.password))) {
    return next(new ApiError(401, "Invalid email or password"));
  }

  const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: user,
    token,
  });
});

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.auth && req.headers.auth.startsWith("Bearer")) {
    token = req.headers.auth.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "You are not logged in, please login"));
  }

  const decoded = JWT.verify(token, process.env.JWT_SECRET);

  const user = await userSchema.findById(decoded.userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (user.resetPasswordAt) {
    const timeResetPass = parseInt(user.resetPasswordAt / 1000, 10);

    console.log(timeResetPass, decoded.iat);
    if (timeResetPass > decoded.iat) {
      return next(new ApiError("Please login again", 401));
    }
  }

  req.user = user;
  next();
});
