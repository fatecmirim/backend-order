import express from "express";
import HealthRouter from "./health";
import CustomerRouter from "./customer";
import ProductRouter from "./product";
import OrderRouter from "./order";
import LoginRouter from "./login";

const router = express.Router();


router.use("/health", HealthRouter);
router.use("/customers", CustomerRouter);
router.use("/products", ProductRouter)
router.use("/orders", OrderRouter);
router.use("/login", LoginRouter);

export default router;