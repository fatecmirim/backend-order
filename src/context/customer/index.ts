import express from "express";
const router = express.Router();
import { CustomersController } from "./controller";
const controller = new CustomersController();

router.post("/", (req, res, next) => {

});