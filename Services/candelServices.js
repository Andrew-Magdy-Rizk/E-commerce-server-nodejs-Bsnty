import asyncHandler from "express-async-handler";
import candelSchema from "../Models/candelSchema.js";
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
import cloudinary from "../Config/cloudinary.js";

// Upload single image
// export const uploadCategoryImage = uploadSingleImage("image");

// Image processing
// export const resizeImage = asyncHandler(async (req, res, next) => {
//   // const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

//   // if (req.file) {
//   //   await sharp(req.file.buffer)
//   //     .resize(600, 600)
//   //     .toFormat("jpeg")
//   //     .jpeg({ quality: 95 })
//   //     .toFile(`uploads/categories/${filename}`);

//   //   // Save image into our db
//   // req.body.image = filename;
//   // }

//   if (req.file) {
//     const imagesBuffer = await sharp(req.file.buffer)
//       .resize(500)
//       .toFormat("jpg")
//       .jpeg({ quality: 95 })
//       .toBuffer();
//     console.log(imagesBuffer);

//     cloudinary.uploader
//       .upload_stream({ folder: "categories" }, (error, result) => {
//         if (error) {
//           console.log(error);
//           return next(error);
//         } else {
//           req.body.image = result.url;
//           next();
//         }
//       })
//       .end(imagesBuffer);
//   } else {
//     next();
//   }
// });

export const getCandels = getAll(candelSchema);

export const createCandel = createOne(candelSchema);

export const getCandel = getOne(candelSchema);

export const updateCandel = updateOne(candelSchema);

export const deleteCandel = deleteOne(candelSchema);
