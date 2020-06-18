import express from "express";
const router = express.Router();
import { ProductController } from "./controller";
import { ProductValidator } from "./validator";
import { validateAdmin } from "../../middlewares/validateAdmin";
const controller = new ProductController();

router.post("/", validateAdmin,ProductValidator.validateSaveProduct, (req, res, next) => {
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

router.delete("/:id", (req, res, next) => {
  controller.deleteProductById(req, res, next);
});

router.patch("/:id", validateAdmin, ProductValidator.validateUpdateProductById, (req, res, next) => {
  controller.updateProductById(req, res, next);
});


export default router;