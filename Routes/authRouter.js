import express from "express";
import { signup, login } from "../Services/authServices.js";
import { signUpValid, loginValid } from "../Utils/validators/authValidator.js";

const router = express.Router();

router.route("/signup").post(signUpValid, signup);
router.route("/login").post(loginValid, login);

export default router;
