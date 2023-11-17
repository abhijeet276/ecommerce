import express from "express"
import { UserController } from "../controllers/userController"

const router = express.Router();

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);
router.route("/logout").get(UserController.logout);
router.route("/password/forgot").post(UserController.forgotPassword);

export default router;
