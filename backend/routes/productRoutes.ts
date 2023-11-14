import express from "express"
import { ProductController } from "../controllers/productController"

const router = express.Router()

router.route("/create-product").post(ProductController.createProduct);
router.route("/").get(ProductController.getAllProducts);
router.route("/:id")
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)
    .get(ProductController.getProductById)
export default router;