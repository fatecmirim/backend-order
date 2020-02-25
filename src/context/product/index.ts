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

router.get("/name", ProductValidator.validateGetProductByName, (req, res, next) => {
  controller.getProductByNameIlike(req, res, next);
});

router.get("/stock", ProductValidator.validateVerifyProductStock, (req, res, next) => {
  controller.verifyProductStock(req, res, next);
});

router.get("/:id", (req, res, next) => {
  controller.getProductById(req, res, next);
});

router.patch("/:id", ProductValidator.validateUpdateProductById, (req, res, next) => {
  controller.updateProductById(req, res, next);
});


export default router;