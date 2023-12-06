import express, { Router } from "express"
import { ProductController } from "../controllers/productController"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const router = express.Router();
router.route("/create-product").post(isAuthenticated,authorizeRoles("admin"), ProductController.createProduct);
router.route("/").get(ProductController.getAllProducts);
router.route("/review").put(ProductController.createOrUpdateReview)
router.route("/review")
    .get(ProductController.getAllReviews)
    .delete(ProductController.deleteReview);
router.route("/:id")
    .put(authorizeRoles("admin"), ProductController.updateProduct)
    .delete(authorizeRoles("admin"), ProductController.deleteProduct)
    .get(ProductController.getProductById)
// const authenticatedRouter = (router: Router) => {
//     router.use(isAuthenticated);
//     router.route("/create-product").post(authorizeRoles("admin"), ProductController.createProduct);
//     router.route("/").get(ProductController.getAllProducts);
//     router.route("/review").put(ProductController.createOrUpdateReview)
//     router.route("/review")
//         .get(ProductController.getAllReviews)
//         .delete(ProductController.deleteReview);
//     router.route("/:id")
//         .put(authorizeRoles("admin"), ProductController.updateProduct)
//         .delete(authorizeRoles("admin"), ProductController.deleteProduct)
//         .get(ProductController.getProductById)
//     return router;
// }
// const router = authenticatedRouter(express.Router());
export default router;