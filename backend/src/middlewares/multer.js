import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes("image"))
      cb(null, join(__dirname, "../uploads/images"));
    if (file.mimetype.includes("pdf"))
      cb(null, join(__dirname, "../uploads/docs"));
    if (file.mimetype.includes("zip") || file.mimetype.includes("rar"))
      cb(null, join(__dirname, "../uploads/zips"));
  },
  filename: (req, file, cb) => {
    const splitnamefile = Buffer.from(file.originalname, 'latin1').toString('utf8').split(".");
    // const splitnamefile = file.originalname.split(".");
    const namefile = `${splitnamefile[0]}-${Date.now()}.${splitnamefile.pop()}`;
    cb(null, namefile);
  },
});

export const uploadMiddle = multer({
  storage,
  defParamCharset: "utf-8",
  defCharset: "utf-8",
});
