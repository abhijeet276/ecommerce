import express from "express"
import ProductRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
const router = express.Router();
router.use("/products", ProductRoutes)
router.use("/user", userRoutes)

export default router