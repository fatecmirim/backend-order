import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "tmp", "uploads"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(32, (err, buf) => {
      if (err) throw err;
      cb(null, `${buf.toString('hex')}${path.extname(file.originalname)}`)
    });
  }
});

const upload = multer({ storage });

export default upload;
