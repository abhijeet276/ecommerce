import express from "express"
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { OrderController } from "../controllers/orderController";

const router = express.Router();
router.route("/myorders").get(isAuthenticated,OrderController.order);
router.route("/new").post(isAuthenticated, OrderController.createProduct);
router.route("/:id").get(isAuthenticated, authorizeRoles("admin"), OrderController.SelectedOrder);
export default router;