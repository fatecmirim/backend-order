import express from "express";
const router = express.Router();
import { CustomerController } from "./controller";
import { CustomerValidator } from "./validator";
import { validateToken } from "../../middlewares/validateToken";
import { validateAdmin } from "../../middlewares/validateAdmin";
const controller = new CustomerController();

router.post("/", CustomerValidator.validateSignUp, (req, res, next) => {
  controller.signup(req, res, next);
});

router.get("/:id", validateToken, (req, res, next) => {
  controller.getCustomerById(req, res, next);
});

router.get("/", validateToken, validateAdmin, (req, res, next) => {
  controller.getAllCustomers(req, res, next);
});

router.get("/find", validateToken, validateAdmin, (req, res, next) => {
  controller.getCustomerByEmail(req, res, next);
});


router.patch("/:id", CustomerValidator.validateUpdate, (req, res, next) => {
  controller.updateCustomerById(req, res, next);
});

export default router;