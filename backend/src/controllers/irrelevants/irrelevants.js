import Conversations from "../../models/Conversations.js";
import Messages from "../../models/Messages.js";
import Roles from "../../models/Roles.js";
import Uploads from "../../models/Uploads.js";
import { Users } from "../../models/User.js";

/**
 * Funcion que obtiene informacion de diferentes Modelos
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getIndexInfo = async (req, res) => {
  try {
    const messages = await Messages.count()
    const users = await Users.count()
    const conversations = await Conversations.count()
    const uploads = await Uploads.count()
    const roles = await Roles.count()
    res.status(200).json({
      message: "Ok",
      body: [{ users }, { roles }, { conversations }, { messages }, { uploads }],
    });

  } catch (error) {
    res.status(403).json({
      message: "Ocurrio un error",
      body: [{ message: "Ocurrio un error" }],
    });
  }
}

export { getIndexInfo }