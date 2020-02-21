import express from "express";
import routes from "./context";
const router = express();


router.use("/api", routes);

export default router;