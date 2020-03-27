import express from "express";
import HealthRouter from "./health";
import CustomerRouter from "./customer";
import ProductRouter from "./product";
import OrderRouter from "./order";
import LoginRouter from "./login";
import PhotoRouter from "./photos"
import { validateToken } from "../middlewares/validateToken";
const router = express.Router();


router.use("/health", HealthRouter);
router.use("/customers", CustomerRouter);
router.use("/products", validateToken, ProductRouter)
router.use("/orders", validateToken, OrderRouter);
router.use("/login", LoginRouter);
router.use("/photos", PhotoRouter);

export default router;