import express from "express";
const router = express.Router();
import { CustomersController } from "./controller";
import { CustomerValidator } from "./validator";
const controller = new CustomersController();

router.post("/", CustomerValidator.validateSignUp, (req, res, next) => {
  controller.signup(req, res, next);
});

router.get("/", (req, res, next) => {
  controller.getAllCustomers(req, res, next);
});

router.get("/find", (req, res, next) => {
  controller.getCustomerByEmail(req, res, next);
});

router.patch("/:id", CustomerValidator.validateUpdate, (req, res, next) => {
  controller.updateCustomerById(req, res, next);
});

export default router;