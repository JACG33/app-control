import Conversations from "../../models/Conversations.js";
import Messages from "../../models/Messages.js";

/**
 * Funcion que obtiene todos los mensajes
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getMessages = async (req, res) => {
  try {
    await Messages.sync({ force: false });
    const result = await Messages.findAll();
    res.json({
      message: "Ok",
      body: result,
    });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que obtiene un mensaje
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Messages.sync();

    const result = await Messages.findOne({ where: { id } });

    res.json({ message: "ok", body: result });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que crea una nueva conversarion y relaciona el mensaje enviado
 * @param {Request} req Request
 * @param {Response} res Response
 */
const createMessage = async (req, res) => {
  try {
    const { asunto, user, message, creator } = req.body;

    await Conversations.sync();
    await Messages.sync();

    const chat = {
      conversationid: "",
      asunto: "",
      messageid: "",
      message,
    };

    const conversation = await Conversations.create({
      id_user: user,
      conversation_name: asunto,
    });

    if (conversation) {
      console.log(conversation);
      chat.conversationid = conversation.dataValues.id;
      chat.asunto = asunto;
      const result = await Messages.create({
        id_conversation: conversation.dataValues.id,
        message_content: message,
        message_creator: creator,
      });

      if (result) {
        chat.messageid = result.dataValues.id;
      }

      console.log(conversation);
    } else {
      return res.status(403).json({
        message: "Ocurrio un error",
        body: [{ message: "Ocurrio un error" }],
      });
    }

    return res.status(200).json({ message: "Mensaje Creado", body: chat });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que añade un nuevo mesaje relacionado a una conversacion
 * @param {Request} req Request
 * @param {Response} res Response
 */
const pushMessage = async (req, res) => {
  try {
    const { conversation, message, creator } = req.body;

    await Messages.sync();

    const chat = {
      messageid: "",
      message,
    };

    const result = await Messages.create({
      id_conversation: conversation,
      message_content: message,
      message_creator: creator,
    });

    if (result) {
      chat.messageid = result.dataValues.id;
    } else {
      return res.status(403).json({
        message: "Ocurrio un error",
        body: [{ message: "Ocurrio un error" }],
      });
    }

    return res.status(200).json({ message: "Mensaje Creado", body: chat });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que actualiza un mensaje
 * @param {Request} req Request
 * @param {Response} res Response
 */
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cantidad } = req.body;
    await Messages.sync();

    const result = await Messages.update(
      {
        nombre: name,
        cantidad,
      },
      {
        where: { id },
      },
    );

    res.json({ message: "ok", body: result });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que elimina un mensaje
 * @param {Request} req Request
 * @param {Response} res Response
 */
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Messages.sync();

    const result = await Messages.destroy({ where: { id } });

    res.json({ message: "ok", body: result });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * #############
 * Conversations
 * #############
 */

/**
 * Fucion que obtiene las conversacion de un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getAllConversations = async (req, res) => {
  try {
    await Conversations.sync();

    const allConversation = await Conversations.findAll();
    res.json({
      message: "Ok",
      body: allConversation,
    });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que obtiene las conversacion de un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getConversationByUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Conversations.sync();

    const result = await Conversations.findAll({ where: { id_user: id } });

    res.json({ message: "ok", body: result });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que obtiene los mensajes de una conversacion
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getMessagesByConversation = async (req, res) => {
  try {
    const { id } = req.params;
    await Messages.sync();

    const result = await Messages.findAll({ where: { id_conversation: id } });

    res.json({ message: "ok", body: result });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que elimina una conversacion
 * @param {Request} req Request
 * @param {Response} res Response
 */
const deleteConversations = async (req, res) => {
  try {
    const { ids } = req.body;

    const find = await Conversations.findAll({ where: { id: ids } });

    if (find == null)
      return res.status(403).json({
        message: "Conversaciones no encontradas",
        body: [{ message: "Conversaciones no encontradas" }],
      });

    Conversations.destroy({ where: { id: ids } }).then((res) => {
      console.log(res);
      if (res < 1)
        return res.status(403).json({
          message: "Ocurrio un error al borrar las conversaciones",
          body: [{ message: "Ocurrio un error al borrar las conversaciones" }],
        });
    });

    return res.status(200).json({
      message: "Conversaciones borradas",
      body: [{ message: "Conversaciones borradas" }],
    });
  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que actualiza el estado de una conversacion
 * @param {Request} req Request
 * @param {Response} res Response
 */
const updateStatusConversation = async (req, res) => {
  try {
    const { ids } = req.body;

    await Conversations.sync();
    ids.forEach((id) => {
      Conversations.update(
        {
          conversation_status: id.status,
        },
        { where: { id: id.id } },
      );
    });
    res.status(200).json({
      message: "Estatus actualizados",
      body: [{ message: "Estatus actualizados" }],
    });
  } catch (error) {
    console.log({ error });
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * #############
 * Conversations Socket
 * #############
 */

const getAllConversationsSocket = async () => {
  try {
    await Conversations.sync();

    const allConversation = await Conversations.findAll();
    return {
      message: "Ok",
      body: allConversation,
    };
  } catch (error) {
    return {
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    };
  }
};

/**
 * Fucion que obtiene las conversacion de un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getConversationByUserSocket = async ({ id }) => {
  try {
    await Conversations.sync();

    const result = await Conversations.findAll({ where: { id_user: id } });

    return {
      message: "ok",
      body: result,
    };
  } catch (error) {
    return {
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    };
  }
};

/**
 * Funcion que crea una conversacion nueva y asigna el mensaje enviado.
 * @param {Object} params Objeto de paramentros.
 * @param {String} params.asunto Asusto de la conversacion.
 * @param {String} params.user Usuarion creador de la conversacion.
 * @param {String} params.message Mesaje de la conversacion.
 * @param {String} params.creator Tipo de usuario que envia el mensaje.
 * @return Objeto de mensaje.
 */
const createMessageSocket = async ({ asunto, user, message, creator }) => {
  try {
    await Conversations.sync();
    await Messages.sync();

    const chat = {
      conversationid: "",
      asunto: "",
      messageid: "",
      message,
    };

    const conversation = await Conversations.create({
      id_user: user,
      conversation_name: asunto,
    });

    if (conversation) {
      console.log(conversation);
      chat.conversationid = conversation.dataValues.id;
      chat.asunto = asunto;
      const result = await Messages.create({
        id_conversation: conversation.dataValues.id,
        message_content: message,
        message_creator: creator,
      });

      if (result) {
        chat.messageid = result.dataValues.id;
        chat.creator = creator
        chat.time=result.createdAt
      }

      console.log(conversation);
    } else {
      return {
        message: "error",
        body: [{ message: "Ocurrio un error" }],
      };
    }

    return { message: "ok", body: chat };
  } catch (error) {
    console.log(error);
    return ({
      message: "error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
};

/**
 * Fucion que añade un nuevo mesaje relacionado a una conversacion
 * @param {Object} params Objeto de parametros.
 * @param {String|Number} params.conersation Identificador de la conversacion.
 * @param {String} params.message Mesanje.
 * @param {String} params.creator Tipo de usuario que envia el mensaje.
 * @return Objeto de mensaje.
 */
const pushMessageSocket = async ({ conversation, message, creator }) => {
  try {
    await Messages.sync();

    const chat = {
      messageid: "",
      message,
      creator,
      createdAt: ""
    };

    const result = await Messages.create({
      id_conversation: conversation,
      message_content: message,
      message_creator: creator,
    });

    if (result) {
      chat.messageid = result.dataValues.id;
      chat.createdAt = result.dataValues.createdAt;
    } else {
      return {
        message: "error",
        body: [{ message: "Ocurrio un error" }],
      };
    }

    return { message: "ok", body: chat };
  } catch (error) {
    console.log(error)
    return {
      message: "error",
      body: [{ message: "Ocurrio un error" }],
    };
  }
};

/**
 * Funcion que elimina varios mensajes.
 * @param {Object} opc Objeto de parametros.
 * @param {Array} opc.ids Objeto de ids a eliminar. 
 */
const deleteMessagesSocket = async ({ ids }) => {
  try {
    await Messages.sync()

    Messages.destroy({ where: { id: ids } }).then((res) => {
      console.log(res);
      if (res < 1)
        return {
          message: "error",
          body: [{ message: "Ocurrio un error al borrar las conversaciones" }],
        }
    });

    return {
      message: "ok",
      body: ids,
    }

  } catch (error) {
    console.log(error)
    return {
      message: "error",
      body: [{ message: "Ocurrio un error" }],
    };
  }
}

export {
  getMessages,
  getMessage,
  createMessage,
  pushMessage,
  updateMessage,
  deleteMessage,
  getConversationByUser,
  getMessagesByConversation,
  deleteConversations,
  updateStatusConversation,
  getAllConversations,
  createMessageSocket,
  pushMessageSocket,
  deleteMessagesSocket,
  getAllConversationsSocket,
  getConversationByUserSocket
};
