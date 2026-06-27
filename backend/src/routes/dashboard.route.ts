import { Router } from "express";
import * as controller from "../controllers/dashboard.controller";

const router = Router();

router.get("/", controller.getDashboardStats);

router.get("/analytics", controller.getDashboardAnalytics);


export default router;