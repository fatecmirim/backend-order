import Login from "./controller";
import express from "express";

const router = express.Router();
const controller = new Login();

router.post("/", (req, res, next) => {
  controller.login(req, res, next);
});

export default router;

