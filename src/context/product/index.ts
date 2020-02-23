import express from "express";
const router = express.Router();
import { ProductController } from "./controller";
import { ProductValidator } from "./validator";
const controller = new ProductController();

router.post("/", ProductValidator.validateSaveProduct, (req, res, next) => {
  controller.save(req, res, next);
});

router.get("/", (req, res, next) => {
  controller.getAllProduct(req, res, next);
});

export default router;