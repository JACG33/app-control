import { Router } from "express";
import * as product from "../controllers/products/productsController.js";
import { verifyToekn } from "../middlewares/verifyToken.js";

const apiProductRouter = Router()

// Get all users
apiProductRouter.get("/", verifyToekn, product.getProducts)
// One user
apiProductRouter.get("/:id", product.getProduct)
// Create user
apiProductRouter.post("/", product.createProduct)
// Update user
apiProductRouter.put("/:id", product.updateProduct)
// Delete user
apiProductRouter.delete("/:id", product.deleteProduct)

export default apiProductRouter 