import ApiError from "../Utils/ApiError.js";
import asyncHandler from "express-async-handler";
import ApiFeatures from "../Utils/ApiFeatures.js";
import cloudinary from "../Config/cloudinary.js";
import { destroy } from "../Middlewares/destroyImageMiddleware.js";

export const getAll = (Schema) =>
  asyncHandler(async (req, res) => {
    let filterObject = {};

    // build query
    const countDocuments = await Schema.countDocuments();
    const ApiFeature = new ApiFeatures(Schema.find(filterObject), req.query)
      .filter()
      .sort()
      .limitFields()
      .search()
      .paginate(countDocuments);

    const { mongooseQuery, pagination } = ApiFeature;

    // execute query
    const data = await mongooseQuery;
    res.status(200).json({
      status: "success",
      pagination,
      data,
    });
  });

export const createOne = (Schema) =>
  asyncHandler(async (req, res) => {
    console.log("console test:", req.body);
    const docement = await Schema.create(req.body);
    res.status(201).json({
      status: "success",
      data: docement,
    });
  });

export const getOne = (Schema) =>
  asyncHandler(async (req, res, next) => {
    const docement = await Schema.findById(req.params.Id);
    if (!docement) {
      return next(new ApiError(404, "Docement not found"));
    }
    res.status(200).json({
      status: "success",
      data: docement,
    });
  });

export const updateOne = (Schema) =>
  asyncHandler(async (req, res, next) => {
    const docement = await Schema.findByIdAndUpdate(req.params.Id, req.body, {
      new: true,
    });
    if (!docement) {
      return next(new ApiError(404, "Docement not found"));
    }
    res.status(200).json({
      status: "success",
      data: docement,
    });
  });

export const deleteOne = (Schema) =>
  asyncHandler(async (req, res, next) => {
    const docement = await Schema.findByIdAndDelete(req.params.Id);
    console.log("Document:", docement);
    if (!docement) {
      return next(new ApiError(404, "Document not found"));
    }

    if (!docement.image && !docement.imageCover) {
      return next(new ApiError(404, "Image not found in the document"));
    } else {
      if (docement.image) {
        await destroy(docement.image);
      } else if (docement.imageCover && !docement.images) {
        await destroy(docement.imageCover);
      } else if (docement.imageCover && docement.images) {
        await destroy(docement.imageCover);
        docement.images.forEach(async (image) => {
          await destroy(image);
        });
      }
    }

    // // استخراج الـ public_id بشكل صحيح
    // const public_id = docement.image
    //   .split("upload/")[1]
    //   .split("/")
    //   .slice(1, 3)
    //   .join("/")
    //   .split(".")[0]; // نحذف كل شيء قبل "upload/"

    // console.log("Public_id:", public_id);

    // // حذف الصورة من Cloudinary
    // try {
    //   const result = await cloudinary.uploader.destroy(public_id, {
    //     resource_type: "image",
    //   });
    //   console.log("Result:", result);
    // } catch (error) {
    //   console.log("Error:", error);
    //   return next(error);
    // }

    // الاستجابة
    res.status(204).json({
      status: "success",
      data: docement,
    });
  });
