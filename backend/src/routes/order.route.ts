import { Router } from "express";
import * as controller from "../controllers/order.controller";

const router = Router();

router.post("/", controller.create);

router.get("/", controller.findAll);

router.get("/:id/invoice", controller.invoice);

router.patch("/:id/status", controller.updateOrderStatus);

export default router;
