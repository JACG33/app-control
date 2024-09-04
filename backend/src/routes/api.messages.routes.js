import * as message from "../controllers/messages/messagesController.js";
import { Router } from "express";

const apiMessageRouter = Router()

// Get all messages
apiMessageRouter.get("/", message.getMessages)
// One message
apiMessageRouter.get("/:id", message.getMessage)
// Create Conversation
apiMessageRouter.post("/", message.createMessage)
// Create message to conversation
apiMessageRouter.post("/push-message", message.pushMessage)
// Update message
apiMessageRouter.put("/:id", message.updateMessage)
// Delete message
apiMessageRouter.delete("/:id", message.deleteMessage)

export default apiMessageRouter 