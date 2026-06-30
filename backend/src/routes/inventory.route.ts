import express from "express";
import * as controller from "../controllers/inventory.controller";

const router = express.Router();

router.get("/", controller.getAllIngredients);
router.get("/:id", controller.getIngredientById);
router.post("/", controller.createIngredient);
router.put("/:id", controller.updateIngredient);
router.delete("/:id", controller.deleteIngredient);

router.get("/", controller.getInventory);

router.get("/stats", controller.getStats);
export default router;