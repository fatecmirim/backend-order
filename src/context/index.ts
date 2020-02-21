import express from "express";
import Health from "./health";
const router = express.Router();


router.use("/health", Health);



export default router;