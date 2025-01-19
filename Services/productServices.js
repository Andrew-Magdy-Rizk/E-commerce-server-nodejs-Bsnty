import { v4 as uuidv4 } from "uuid";
import asyncHandler from "express-async-handler";
import { uploadMixOfImages } from "../Middlewares/uploadImageMiddleware.js";
import productSchema from "../Models/productSchema.js";

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import sharp from "sharp";
import cloudinary from "../Config/cloudinary.js";

export const uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover

  // if (req.files.imageCover) {
  //   const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

  //   await sharp(req.files.imageCover[0].buffer)
  //     .resize(450, 500)
  //     .toFormat("jpeg")
  //     .jpeg({ quality: 95 })
  //     .toFile(`uploads/products/${imageCoverFileName}`);

  //   // Save image into our db
  //   req.body.imageCover = imageCoverFileName;
  // }

  if (req.files.imageCover) {
    try {
      console.log(req.files);
      const coverResult = await new Promise((resolve, reject) => {
        const coverStream = cloudinary.uploader.upload_stream(
          { quality: "auto:good", format: "jpg", folder: "products" },
          (error, result) => {
            if (error) {
              return reject(error);
            } else {
              return resolve(result.url);
            }
          }
        );
        coverStream.end(req.files.imageCover[0].buffer);
      });

      req.body.imageCover = coverResult;
    } catch (err) {
      console.log(err);
      return next(err);
    }
  } else {
    next();
  }
  //2- Image processing for images
  // if (req.files.images) {
  //   req.body.images = [];
  //   await Promise.all(
  //     req.files.images.map(async (img, index) => {
  //       const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
  //       await sharp(img.buffer)
  //         .resize(450, 500)
  //         .toFormat("jpeg")
  //         .jpeg({ quality: 95 })
  //         .toFile(`uploads/products/${imageName}`);

  //       // Save image into our db
  //       req.body.images.push(imageName);
  //     })
  //   );
  // }

  if (req.files.images) {
    try {
      req.body.images = await Promise.all(
        req.files.images.map(
          (img) =>
            new Promise((resolve, reject) => {
              const imageStream = cloudinary.uploader.upload_stream(
                { quality: "auto:good", format: "jpg", folder: "products" },
                (error, result) => {
                  if (error) return reject(error);
                  else return resolve(result.url);
                }
              );
              imageStream.end(img.buffer);
            })
        )
      );
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }
  next();
});

export const getProducts = getAll(productSchema);

export const createProduct = createOne(productSchema);

export const getProduct = getOne(productSchema);

export const updateProduct = updateOne(productSchema);

export const deleteProduct = deleteOne(productSchema);
