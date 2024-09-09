import { Router } from "express";

import apiAuthRouter from "./api.auth.routes.js";
import apiProductRouter from "./api.products.routes.js";
import apiUsersRouter from "./api.users.routes.js";
import apiRolesRouter from "./api.roles.routes.js";
import apiUploadsRouter from "./api.uploads.routes.js";
import apiMessageRouter from "./api.messages.routes.js";
import apiConversationRouter from "./api.conversations.js";
import apiIrrelevantsRouter from "./api.irrelevants.routes.js";

const apiRoutes = Router()

apiRoutes.use("/api/auth", apiAuthRouter)
apiRoutes.use("/api/users", apiUsersRouter)
apiRoutes.use("/api/products", apiProductRouter)
apiRoutes.use("/api/roles", apiRolesRouter)
apiRoutes.use("/api/uploads", apiUploadsRouter)
apiRoutes.use("/api/messages", apiMessageRouter)
apiRoutes.use("/api/conversations", apiConversationRouter)
apiRoutes.use("/api/irrelevants", apiIrrelevantsRouter)

export default apiRoutes