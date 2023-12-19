import express from "express"
import ProductRoutes from "./productRoutes"
import userRoutes from "./userRoutes"
import orderRoutes from "./orderRoutes"
const router = express.Router();
router.use("/v1/products", ProductRoutes)
router.use("/v1/user", userRoutes)
router.use("/v1/order", orderRoutes)

export default router