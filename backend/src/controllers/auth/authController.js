import bcry from "bcryptjs";
import Roles from "../../models/Roles.js";
import { Users } from "../../models/User.js";
import { userRegisterSchema } from "../../schema/user.schema.js";
import { generateAccessToken, generateRefreshToken, validateRefreshToken } from "../../token/token.manager.js";

/**
 * Funcion que autentica un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    await Users.sync();

    const getUser = await Users.findOne(
      {
        include: { model: Roles, attributes: ["role_name"] },
        where: { nombre_usuario: username }
      }
    );

    if (!getUser)
      return res.status(401).json({ message: "Datos incorrectos", body: [{message: "Datos incorrectos"}] });

    let passCompare = getUser["dataValues"].password;
    let passHash = await bcry.compare(password, passCompare);

    if (!passHash)
      return res.status(401).json({ message: "Datos incorrectos", body: [{message: "Datos incorrectos"}] });

    let { id_user, nombre_usuario } = getUser["dataValues"];
    const { role_name } = getUser["dataValues"].Role.dataValues

    console.log({ role_name });

    let accessToken = generateAccessToken({ id_user, nombre_usuario });
    let refreshToken = generateRefreshToken({ id_user, nombre_usuario });

    req.session.user = id_user;
    req.session.user_rol = role_name;
    req.session.token = refreshToken;

    res.status(200).json({
      message: "Logeado",
      body: [
        {
          accessToken,
          refreshToken,
          userData: { id_user, user_rol: role_name ,user_name:nombre_usuario}
        }
      ]
    });
  } catch (err) {
    res.status(403).json({ message: "Ocurrio un error al intentar loguearse", body: [{message: "Ocurrio un error al intentar loguearse"}] })
    console.log(err);
  }
}

/**
 * Funcion que registra un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const authRegister = async (req, res) => {
  try {
    const { username, name, lastname, password } = req.body

    const validate = userRegisterSchema.safeParse(req.body)

    if (validate.error) {
      const errors = validate.error.errors.map(ele => ({ message: ele.message }))

      return res.status(401).json({ message: "error", body: errors })
    }


    let passHash = await bcry.hash(password, 8);
    await Users.sync({})

    const result = await Users.create({
      nombre_usuario: username,
      nombre: name,
      apellido: lastname,
      password: passHash
    })

    if (!result)
      return res.status(403).json({ message: "Erro en los datos", body: [{message: "Erro en los datos"}] });

    res.status(203).json({ message: "Usuario registrado", body: [{message: "Usuario registrado"}] });
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{message: "Ocurrio un error"}] })
    console.log(error);
  }
}

/**
 * Funcion que elimina la session de un usuario
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const authLogut = async (req, res) => {
  try {
    let { authorization } = req.headers;
    
    req.session.destroy();

    res.json({ message: "Out", body: [] });
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{message: "Ocurrio un error"}] })
    console.log(error);
  }
}

/**
 * Funcion que genera un nuevo token
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const authRefreshToken = async (req, res) => {
  try {
    const verify = validateRefreshToken(req.headers["refresh-token"]);

    if (verify.status != true) {
      res.status(401).json({ message: "Token no valido", body: [] })
    } else {
      const { id, nombre_usuario } = verify
      const newToken = generateAccessToken({ id, nombre_usuario })
      res.status(200).json({
        message: "Ok",
        body: [
          {
            accessToken: newToken
          }
        ]
      })
    }

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{message: "Ocurrio un error"}] })
  }
}

export { authLogin, authLogut, authRefreshToken, authRegister };

