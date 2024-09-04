import { validateAccessToken } from "../token/token.manager.js";

/**
 * Funcion que verifica la validez de un Token.
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {next} next Next
 */
export const verifyToekn = async (req, res, next) => {
  const { authorization } = req.headers

  let resultValidate = validateAccessToken(String(authorization).split(" ")[1])

  if (!resultValidate) {
    res.status(401).json({ message: "Token de acceso caducado" });
  } else {
    next();
  }
};
