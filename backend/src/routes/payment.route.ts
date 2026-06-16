import { Router, Request, Response } from "express";
import * as controller from "../controllers/payment.controller";

const router = Router();

router.post("/",controller.create);

router.get("/",controller.findAll);

router.get("/:id", controller.findOne);

//router.patch("/:id/status", controller.updateStatus);

export default router;
