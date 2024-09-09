import { Router } from "express";
import * as irrelevants from "../controllers/irrelevants/irrelevants.js";
const apiIrrelevantsRouter = Router()

apiIrrelevantsRouter.get("/", irrelevants.getIndexInfo)

export default apiIrrelevantsRouter