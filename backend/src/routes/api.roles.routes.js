import { Router } from 'express'
import * as roles from '../controllers/roles/rolesController.js'

const apiRolesRouter = Router()

// Get all roles
apiRolesRouter.get("/", roles.getRoles)

// Get role
apiRolesRouter.get("/:id", roles.getRole)

// Create role
apiRolesRouter.post("/", roles.createRole)

// Update role
apiRolesRouter.put("/:id", roles.updateRole)

// Delete role
apiRolesRouter.delete("/:id", roles.deleteRole)

export default apiRolesRouter