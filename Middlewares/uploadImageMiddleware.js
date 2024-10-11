import multer from "multer";
import ApiError from "../Utils/ApiError.js";

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Only Images allowed"), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

export const uploadSingleImage = (fieldName) =>
  multerOptions().single(fieldName);

export const uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
