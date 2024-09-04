/**
 * Funcion que verifica si un usuario esta logeado.
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {next} next Next
 * @returns Json
 */
export const verifyRoleUser = async (req, res, next) => {
  if (req.session.user_rol == "user")
    return res.status(401).json({ message: "No tines permiso para realizar esta accion", body: [{message: "No tines permiso para realizar esta accion"}] });
  next();
};
