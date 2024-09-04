import jwt from "jsonwebtoken";

/**
 * Tiempo de expiracion del Token de accesos
 */
const timeAccessExpire = "10m";

/**
 * Tiempo de expiracion del Token de refresco
 */
const timeRefreshExpire = "7d";

/**
 * Firma secreta token de acceso
 */
const accessSecret = process.env.JWT_SECRET

/**
 * Firma secreta token de refresh
 */
const refreshSecret = process.env.JWT_REFRESH_SECRET

/**
 * Funcion que genera un token
 * @param {Object} payload Informacion del usuario
 * @param {Number} timeExpire Tiempo de expiracion
 * @param {String} secret Firma secreta
 * @returns Token
 */
const tokenGenerate = (payload, timeExpire, secret) => {
  return jwt.sign(payload, secret, {
    expiresIn: timeExpire,
    algorithm: "HS256",
  });
};

/**
 * Funcion que genera un nuevo token de acceso
 * @param {Object} user Informacion del usuario
 * @returns Token
 */
const generateAccessToken = (user) => tokenGenerate(user, timeAccessExpire, accessSecret);

/**
 * Funcion que refresca un token
 * @param {Object} payload Informacion del usuario
 * @returns Token
 */
const generateRefreshToken = (user) => tokenGenerate(user, timeRefreshExpire, refreshSecret);


/**
 * Funcion que verifica la validez de un access token
 * @param {String} token Token a validar
 * @returns 
 */
const validateAccessToken = (token) => {
  try {
    let validate = jwt.verify(token, accessSecret, {
      ignoreExpiration: false
    })
    return true
  } catch (error) {
    return false
  }
}


/**
 * Funcion que verifica la validez de un refresh token
 * @param {String} token Token a validar
 * @returns 
 */
const validateRefreshToken = (token) => {
  try {
    let validate = jwt.verify(token, refreshSecret, {
      ignoreExpiration: false
    })

    return {
      status: true,
      ...validate
    }
  } catch (error) {
    return { status: false }
  }
}

export { generateAccessToken, generateRefreshToken, validateAccessToken, validateRefreshToken };
