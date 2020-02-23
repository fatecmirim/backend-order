import express from "express";
import HealthRouter from "./health";
import CustomerRouter from "./customer";
import ProductRouter from "./product";
const router = express.Router();


router.use("/health", HealthRouter);
router.use("/customers", CustomerRouter);
router.use("/products", ProductRouter)

export default router;