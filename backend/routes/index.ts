import express from "express"
import { UserController } from "../controllers/userController"
import ProductRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
const router = express.Router();
router.use("/product", ProductRoutes)
router.use("/user", userRoutes)

export default router