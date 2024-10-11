import { check } from "express-validator";
import { errorValidatorMiddleware } from "../../Middlewares/errorValidatorMiddleware.js";
import productSchema from "../../Models/productSchema.js";

export const getCategoryValid = [
  check("Id").isMongoId().withMessage("Id must be a valid MongoId"),
  errorValidatorMiddleware,
];

export const updateCategoryValid = [
  check("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("image").optional().isString().withMessage("Image must be a string"),
  errorValidatorMiddleware,
];

export const createCategoryValid = [
  check("name").notEmpty().withMessage("Name is required"),
  ...updateCategoryValid,
  errorValidatorMiddleware,
];

export const deleteCategoryValid = [
  check("Id")
    .isMongoId()
    .withMessage("Id must be a valid MongoId")
    .custom(async (value) => {
      const category = await productSchema.find({ category: value });
      if (category && category.length > 0) {
        throw new Error("Category has products");
      }
      return true;
    }),
  errorValidatorMiddleware,
];
