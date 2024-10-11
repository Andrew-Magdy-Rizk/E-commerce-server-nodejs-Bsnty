import asyncHandler from "express-async-handler";
import userSchema from "../Models/userSchema.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import bcryptjs from "bcryptjs";

export const getUsers = getAll(userSchema);

export const createUser = createOne(userSchema);

export const getUser = getOne(userSchema);

export const deleteUser = deleteOne(userSchema);

export const updateUser = asyncHandler(async (req, res, next) => {
  const { Id } = req.params;
  const { name, email, address, phone, avatar, role } = req.body;

  const user = await userSchema.findOneAndUpdate(
    { _id: Id },
    { name, email, address, phone, avatar, role },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { Id } = req.params;
  const { newPassword } = req.body;
  const user = await userSchema.findOneAndUpdate(
    { _id: Id },
    {
      password: bcryptjs.hashSync(newPassword, 10),
      resetPasswordAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
