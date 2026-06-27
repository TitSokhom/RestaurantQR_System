import { Router } from "express";
import * as controller from "../controllers/table.controller";

const router = Router();

router.post("/", controller.create);

router.get("/", controller.findAll);

router.get("/:id", controller.findOne);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

router.patch("/:id/status", controller.updateTableStatus)

export default router;