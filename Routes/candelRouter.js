import express from "express";
import {
  createCandel,
  getCandels,
  getCandel,
  updateCandel,
  deleteCandel,
  // uploadProductImages,
  // resizeProductImages,
} from "../Services/candelServices.js";
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
    //! uploadProductImages,
    //! resizeProductImages,
    // createProductValid,
    createCandel
  )
  .get(getCandels);
router
  .route("/:Id")
  .get(
    // getProductValid,
    getCandel
  )
  .put(
    protect,
    allowTo("admin"),
    //   updateProductValid,
    updateCandel
  )
  .delete(
    protect,
    allowTo("admin"),
    //   deleteProductValid,
    deleteCandel
  );

export default router;
