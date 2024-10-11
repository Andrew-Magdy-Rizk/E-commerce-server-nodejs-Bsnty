import { errorValidatorMiddleware } from "../../Middlewares/errorValidatorMiddleware.js";
import { check } from "express-validator";
import userSchema from "../../Models/userSchema.js";
export const signUpValid = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
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
  check("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
  check("address").optional().isString().withMessage("Invalid address"),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Invalid phone number only accepted Egy"),
  check("avatar").optional().isURL().withMessage("Invalid  URL avatar"),
  errorValidatorMiddleware,
];

export const loginValid = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email"),
  check("password").notEmpty().withMessage("Password is required"),
  errorValidatorMiddleware,
];
