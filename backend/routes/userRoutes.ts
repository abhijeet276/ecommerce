import express from "express"
import { UserController } from "../controllers/userController"
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);
router.route("/logout").get(UserController.logout);
router.route("/password/forgot").post(UserController.forgotPassword);
router.route("/password/reset/:token").put(UserController.resetPassword);
router.route("/getUserDetails").get(isAuthenticated,UserController.getUserDetails);
router.route("/change-password").post(isAuthenticated,UserController.updatePassword);

export default router;
