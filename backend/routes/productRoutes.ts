import express from "express"
import { ProductController } from "../controllers/productController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const router = express.Router()

router.route("/create-product").post(isAuthenticated,authorizeRoles("admin"),ProductController.createProduct);
router.route("/").get(ProductController.getAllProducts);
router.route("/:id")
    .put(isAuthenticated,authorizeRoles("admin"),ProductController.updateProduct)
    .delete(isAuthenticated,authorizeRoles("admin"),ProductController.deleteProduct)
    .get(ProductController.getProductById)
export default router;