import asyncHandler from "express-async-handler";
import categorySchema from "../Models/categorySchema.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { uploadSingleImage } from "../Middlewares/uploadImageMiddleware.js";

// Upload single image
export const uploadCategoryImage = uploadSingleImage("image");

// Image processing
export const resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});

export const getCategories = getAll(categorySchema);

export const createCategory = createOne(categorySchema);

export const getCategory = getOne(categorySchema);

export const updateCategory = updateOne(categorySchema);

export const deleteCategory = deleteOne(categorySchema);
