import * as conversation from "../controllers/messages/messagesController.js";
import { Router } from "express";

const apiConversationRouter = Router()

// Get all conversation of user
apiConversationRouter.get("/all",conversation.getAllConversations)

// Get all conversation of user
apiConversationRouter.get("/user/:id", conversation.getConversationByUser)

// Get all messages of convesation
apiConversationRouter.get("/messages/:id", conversation.getMessagesByConversation)

// Delete Conversations
apiConversationRouter.delete("/deleteconversation",conversation.deleteConversations)

// Cambiar estatus de Conversations
apiConversationRouter.delete("/update-status",conversation.updateStatusConversation)

export default apiConversationRouter 