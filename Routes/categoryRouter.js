import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
  // uploadCategoryImage,
  // resizeImage,
} from "../Services/categoryServices.js";
import {
  createCategoryValid,
  deleteCategoryValid,
  getCategoryValid,
  updateCategoryValid,
} from "../Utils/validators/categoryValidator.js";
import { protect } from "../Services/authServices.js";
import allowTo from "../Middlewares/allowTo.js";
const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowTo("admin"),
    // uploadCategoryImage,
    // resizeImage,
    createCategoryValid,
    createCategory
  )
  .get(getCategories);
router
  .route("/:Id")
  .get(getCategoryValid, getCategory)
  .put(protect, allowTo("admin"), updateCategoryValid, updateCategory)
  .delete(protect, allowTo("admin"), deleteCategoryValid, deleteCategory);

export default router;
