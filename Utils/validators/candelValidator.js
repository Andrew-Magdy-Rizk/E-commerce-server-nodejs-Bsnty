import { check } from "express-validator";
import { errorValidatorMiddleware } from "../../Middlewares/errorValidatorMiddleware.js";
import candelSchema from "../../Models/candelSchema.js";

export const getProductValid = [
  check("Id").isMongoId().withMessage("Id must be a valid MongoId"),
  errorValidatorMiddleware,
];
export const updateProductValid = [
  check("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters")
    .isLength({ max: 2000 })
    .withMessage("Description can not exceed 2000 characters"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .isLength({ max: 200000 })
    .withMessage("Price can not exceed 200000")
    .custom((value) => /^\d+(\.\d{1,2})?$/.test(value)) // regex to validate price
    .withMessage("Invalid price"),
  check("priceAfterDiscount")
    .optional()
    .custom((value, { req }) => {
      if (parseFloat(value) > parseFloat(req.body.price) && value !== "") {
        throw new Error("Price after discount must be less than price");
      }
      return true;
    }),
  // .custom((value) => /^\d+(\.\d{1,2})?$/.test(value))
  // .withMessage("Invalid price"),
  check("colors").optional().isArray().withMessage("Colors must be an array"),
  check("imageCover").optional(),
  check("images").optional().isArray().withMessage("Images must be an array"),
  check("inStock")
    .isBoolean()
    .withMessage("inStock must be a boolean")
    .optional(),
  check("ratingsAverage")
    .isLength({ max: 5 })
    .withMessage("Ratings average must be less than 5")
    .isNumeric()
    .withMessage("Ratings average must be a number")
    .optional()
    .custom((value) => /^\d+(\.\d{1,2})?$/.test(value))
    .withMessage("Invalid ratings average"),
  check("ratingsQuantity")
    .isNumeric()
    .withMessage("Ratings quantity must be a number")
    .optional(),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Category must be a valid MongoId")
    .custom(async (value) => {
      const category = await categorySchema.findById(value);
      if (!category) {
        throw new Error("Category not found");
      }
      return true;
    }),
  errorValidatorMiddleware,
];
export const createProductValid = [
  check("name").notEmpty().withMessage("Name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("category").notEmpty().withMessage("Category is required"),
  check("imageCover").notEmpty().withMessage("Image Cover is required"),
  ...updateProductValid,
  errorValidatorMiddleware,
];

export const deleteProductValid = [
  check("Id").isMongoId().withMessage("Id must be a valid MongoId"),
  errorValidatorMiddleware,
];
