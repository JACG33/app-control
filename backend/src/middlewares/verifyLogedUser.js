/**
 * Funcion que verifica si un usuario esta logeado.
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {next} next Next
 * @returns Json
 */
export const verifyLogedUser = async (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Session out" });
  next();
};
