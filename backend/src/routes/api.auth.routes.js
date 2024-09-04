import { Router } from "express";
import * as auth from "../controllers/auth/authController.js";

const apiAuthRouter = Router()

// Auth Login
apiAuthRouter.post("/login", auth.authLogin)
// Auth Register
apiAuthRouter.post("/register", auth.authRegister)
// Auth Logut
apiAuthRouter.delete("/logut", auth.authLogut)
// Refresh Token
apiAuthRouter.post("/refresh-token", auth.authRefreshToken)

export default apiAuthRouter 