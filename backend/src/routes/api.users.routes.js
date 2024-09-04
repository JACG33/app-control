import { Router } from "express";
import * as user from "../controllers/users/usersController.js"
import { verifyLogedUser } from "../middlewares/verifyLogedUser.js";
import { verifyRoleUser } from "../middlewares/verifyRoleUser.js";
const apiUsersRouter = Router()

// Get all users
apiUsersRouter.get("/", verifyLogedUser, user.getUsers)
// One user
apiUsersRouter.get("/:id", verifyLogedUser, user.getUser)
// Create user
apiUsersRouter.post("/", verifyLogedUser, verifyRoleUser, user.createUser)
// Update user
apiUsersRouter.put("/:id", verifyLogedUser, verifyRoleUser, user.updateUser)
// Delete user
apiUsersRouter.delete("/:id", verifyLogedUser, verifyRoleUser, user.deleteUser)

export default apiUsersRouter