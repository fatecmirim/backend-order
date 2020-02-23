import express from "express";
import Health from "./health";
import Customer from "./customer";
const router = express.Router();


router.use("/health", Health);
router.use("/customers", Customer);


export default router;