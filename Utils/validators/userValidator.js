import { check } from "express-validator";
import { errorValidatorMiddleware } from "../../Middlewares/errorValidatorMiddleware.js";
import userSchema from "../../Models/userSchema.js";
import bcryptjs from "bcryptjs";

export const updateUserValid = [
  check("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("email")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Email must be at least 5 characters")
    .isLength({ max: 100 })
    .withMessage("Email must be less than 100 characters")
    .isEmail()
    .withMessage("Email must be a valid email")
    .custom(async (value) => {
      const user = await userSchema.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  check("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  check("address").optional().isString().withMessage("Invalid address"),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number only accepted Egy"),
  check("avatar").optional().isURL().withMessage("Invalid  URL avatar"),
  errorValidatorMiddleware,
];

export const createUserValid = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 100 })
    .withMessage("Password must be less than 100 characters")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required"),
  ...updateUserValid,
  errorValidatorMiddleware,
];

export const getUserValid = [
  check("Id").isMongoId().withMessage("Invalid User id format"),
  errorValidatorMiddleware,
];

export const deleteUserValid = [
  check("Id").isMongoId().withMessage("Invalid User id format"),
  errorValidatorMiddleware,
];

export const changePasswordValid = [
  check("Id").isMongoId().withMessage("Invalid User id format"),
  check("currentPassword")
    .notEmpty()
    .withMessage("Please enter current password"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required"),
  check("newPassword")
    .notEmpty()
    .withMessage("new password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 100 })
    .withMessage("Password must be less than 100 characters")
    .custom(async (newPass, { req }) => {
      // check if current password in db
      const user = await userSchema.findById(req.params.Id);
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcryptjs.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }

      if (newPass === req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }

      if (newPass !== req.body.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),
  errorValidatorMiddleware,
];
