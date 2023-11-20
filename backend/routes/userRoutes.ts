import express from "express"
import { UserController } from "../controllers/userController"
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.route("/register").post(UserController.createUser);
router.route("/login").post(UserController.loginUser);
router.route("/logout").get(UserController.logout);
router.route("/password/forgot").post(UserController.forgotPassword);
router.route("/password/reset/:token").put(UserController.resetPassword);
router.route("/getUserDetails").get(isAuthenticated, UserController.getMyUserDetails);
router.route("/change-password").put(isAuthenticated, UserController.updatePassword);
router.route("/update-profile").put(isAuthenticated, UserController.updateProfile);
router.route("/getAllUsers").get(isAuthenticated, UserController.getAllUsers);
router.route("/:id")
    .get(isAuthenticated, UserController.getsingleUsers)
    .put(isAuthenticated,UserController.updateUserRole)
    .delete(isAuthenticated, UserController.deleteUser);

export default router;
