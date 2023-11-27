import express from "express"
import ProductRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
const router = express.Router();
router.use("/v1/products", ProductRoutes)
router.use("/v1/user", userRoutes)

export default router