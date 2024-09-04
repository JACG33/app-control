import {
	createMessageSocket,
	pushMessageSocket,
	deleteMessagesSocket,
	getAllConversationsSocket,
	getConversationByUserSocket
} from "../controllers/messages/messagesController.js";

/**
 * Funcion init del socket para la conversationes.
 * @param {Function} io Instacia de Socket.io
 */
export default function conversationSocket(io) {
	let conversationid;

	io.on("connection", (socket) => {
		socket.on("disconnet", () => {
			console.log("desconectado");
		});

		// Unirse/abrir a una conversacion
		socket.on("join-conversarion", (coversation) => {
			conversationid = coversation;
			socket.join(coversation);
		});

		// Unirse al chat room
		socket.on("join-chat-room", async (coversation) => {
			// const { type, id } = coversation
			// if (type == "all") {
			// 	// socket.join("conversations-all");
			// 	// io.to("conversations-all").emit("all-conversations-result", res)
			// }
			socket.join("joined-chat-room");
			let res = await getAllConversationsSocket()
			io.to("joined-chat-room").emit("all-conversations-result", res)
			// if (type == "single") {
			// 	// socket.join("conversations-single");
			// 	socket.join("joined-chat-room");
			// 	let res = await getConversationByUserSocket({ id })
			// 	io.to("joined-chat-room").emit("all-conversations-result", res)
			// 	// io.to("conversations-single").emit("single-conversations-result", res);
			// }
		});



		// Cerrar una conversacion
		socket.on("leave-conversation", () => {
			socket.leave(conversationid);
		});

		// Crear una nueva conversacion
		socket.on("chat conversation", async (msg) => {
			console.log(msg);
			const { conversation, asunto, user, message, creator } = msg;
			// Verificar que se este enviando mesanjes desde una conversacion existente
			if (conversation) {
				const res = await pushMessageSocket({
					conversation,
					message,
					creator,
				});

				io.to(conversationid).emit("message result", res);
			} else {
				// De lo cotrario crear una nueva
				const res = await createMessageSocket({
					asunto,
					user,
					message,
					creator,
				});
				conversationid = `conversation${res.body.conversationid}`;
				socket.join(conversationid)
				// io.to(conversationid).emit("coversation created", res);
				io.to("joined-chat-room").emit("coversation created", res);
			}
		});

		// Eliminar los mensajes de una conversaion
		socket.on("delete messages", async (msgs) => {
			const res = await deleteMessagesSocket({ ids: msgs.ids })
			io.to(conversationid).emit("deleted messages", res);
		})
	});
}
