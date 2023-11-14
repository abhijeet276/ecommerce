import express from "express"
import { UserController } from "../controllers/userController"

const router = express.Router();

router.route("/create-user").post(UserController.createUser);

export default router;
