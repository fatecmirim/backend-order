import express from "express";
import { OrderController } from "./controller";
import { OrderValidator } from "./validator";
import { validateAdmin } from "../../middlewares/validateAdmin";

const controller = new OrderController();
const router = express.Router();

router.post("/", OrderValidator.validateSaveOrder, (req, res, next) => {
  controller.saveOrder(req, res, next);
});

router.get("/", (req, res, next) => {
  controller.retrieveOrdersByCustomerId(req, res, next);
});

router.get("/all", validateAdmin,(req, res, next) => {
  controller.retrieveAllOrders(req, res, next);
});

export default router;