import ApiError from "../Utils/ApiError.js";
import asyncHandler from "express-async-handler";
import ApiFeatures from "../Utils/ApiFeatures.js";

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
      data,
    });
  });

export const createOne = (Schema) =>
  asyncHandler(async (req, res) => {
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
    if (!docement) {
      return next(new ApiError(404, "Docement not found"));
    }
    res.status(204).json({
      status: "success",
      data: docement,
    });
  });
