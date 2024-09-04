import { Router } from "express";
import * as uploads from "../controllers/uploads/uploads.controller.js";
import { uploadMiddle } from "../middlewares/multer.js";

const apiUploadsRouter = Router();

apiUploadsRouter.post(
  "/",
  uploadMiddle.array("file"),
  uploads.CreateUpload
);
apiUploadsRouter.get("/", uploads.GetUploads);
apiUploadsRouter.get("/:id");
apiUploadsRouter.delete("/:id", uploads.DeleteUpload);

export default apiUploadsRouter;
