import ApiError from "../Utils/ApiError.js";
import asyncHandler from "express-async-handler";

const allowTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(401, "unAuthorized"));
    }
    next();
  });

export default allowTo;
