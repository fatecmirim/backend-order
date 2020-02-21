import express from "express";
import { HealthController } from "./controller";
const router = express.Router();
const controller = new HealthController();


router.get("/", (req, res, next) => {
  controller.success(req, res, next);
});

export default router;
