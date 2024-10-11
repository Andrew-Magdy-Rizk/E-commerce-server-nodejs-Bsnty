import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
} from "../Services/userServices.js";
import {
  createUserValid,
  deleteUserValid,
  getUserValid,
  updateUserValid,
  changePasswordValid,
} from "../Utils/validators/userValidator.js";
import { protect } from "../Services/authServices.js";
import allowTo from "../Middlewares/allowTo.js";
const router = express.Router();

router.route("/changePassword/:Id").put(changePasswordValid, changePassword);
router
  .route("/")
  .post(protect, allowTo("admin"), createUserValid, createUser)
  .get(protect, allowTo("admin"), getUsers);
router
  .route("/:Id")
  .get(getUserValid, getUser)
  .put(protect, allowTo("admin"), updateUserValid, updateUser)
  .delete(protect, allowTo("admin"), deleteUserValid, deleteUser);

export default router;
