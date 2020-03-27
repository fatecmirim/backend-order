import express from "express";
import PhotoController from "./controller";
import upload from "../../middlewares/multer";

const controller = new PhotoController();
const router = express.Router();

router.post("/", upload.single('photo'), (req, res, next) => {
  controller.savePhoto(req, res, next);
});


export default router;