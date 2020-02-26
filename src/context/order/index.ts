import express from "express";
import { OrderController } from "./controller";
import { OrderValidator } from "./validator";

const controller = new OrderController();
const router = express.Router();

router.post("/", OrderValidator.validateSaveOrder, (req, res, next) => {
  controller.saveOrder(req, res, next);
});

export default router;