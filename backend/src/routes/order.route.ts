import { Router } from "express";
import * as controller from "../controllers/order.controller";

const router = Router();

router.post("/", controller.create);
// router.post("/", (req, res, next) => {
//   console.log("POST /api/orders reached");
//   next();
// }, controller.create);
router.get("/", controller.findAll);

router.get("/:id/invoice", controller.invoice);

export default router;
