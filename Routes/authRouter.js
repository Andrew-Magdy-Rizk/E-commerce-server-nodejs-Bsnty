import express from "express";
import { signup, login } from "../Services/authServices.js";
import { signUpValid, loginValid } from "../Utils/validators/authvalidator.js";

const router = express.Router();

router.route("/signup").post(signUpValid, signup);
router.route("/login").post(loginValid, login);

export default router;
