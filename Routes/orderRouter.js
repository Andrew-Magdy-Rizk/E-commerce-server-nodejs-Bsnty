import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  // uploadProductImages,
  // resizeProductImages,
} from "../Services/orderServices.js";
// import {
//   getProductValid,
//   updateProductValid,
//   createProductValid,
//   deleteProductValid,
// } from "../Utils/validators/productValidator.js";
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
    // createProductValid,
    createOrder
  )
  .get(getOrders);
router
  .route("/:Id")
  .get(
    // getProductValid,
    getOrder
  )
  .put(
    protect,
    allowTo("admin"),
    //    updateProductValid,
    updateOrder
  )
  .delete(
    protect,
    allowTo("admin"),
    //    deleteProductValid,
    deleteOrder
  );

export default router;
