import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  // uploadProductImages,
  // resizeProductImages,
} from "../Services/productServices.js";
import {
  getProductValid,
  updateProductValid,
  createProductValid,
  deleteProductValid,
} from "../Utils/validators/productValidator.js";
import { protect } from "../Services/authServices.js";
import allowTo from "../Middlewares/allowTo.js";
const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowTo("admin"),
    // uploadProductImages,
    // resizeProductImages,
    createProductValid,
    createProduct
  )
  .get(getProducts);
router
  .route("/:Id")
  .get(getProductValid, getProduct)
  .put(protect, allowTo("admin"), updateProductValid, updateProduct)
  .delete(protect, allowTo("admin"), deleteProductValid, deleteProduct);

export default router;
