import bcry from 'bcryptjs'
import Roles from "../../models/Roles.js"
import { Users } from "../../models/User.js"
import { userCreateSchema } from "../../schema/user.schema.js"
import { makePagination } from '../../helpers/makePagination.js'

/**
 * Funcion que obtiene todos los usuarios
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const getUsers = async (req, res) => {
  try {
    await Users.sync({ force: false })

    const pagination = makePagination({ apiUrl: "api/users", model: Users, req })

    const result = await Users.findAll(
      {
        attributes: ["id_user", "nombre_usuario", "nombre", "apellido"],
        limit: Number((await pagination).limit),
        offset: (await pagination).offset,
        include: { model: Roles, attributes: ["role_name"] }
      }
    )
    res.status(200).json({
      message: "Ok",
      body: result,
      pagination: (await pagination).pagination
    })
  } catch (error) {
    console.log({ error });
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que obtiene un usuario
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const getUser = async (req, res) => {
  try {
    const { id } = req.params
    await Users.sync()

    const result = await Users.findOne({ where: { id_user: id }, include: { model: Roles, attributes: ["id"] } })

    if (result == null)
      return res.status(403).json({ message: "Usuario no encontrado", body: [{ message: "Usuario no encontrado" }] })

    res.status(200).json({ result })
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que crea un nuevo usuario
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const createUser = async (req, res) => {
  try {
    const { username, name, lastname, password, role } = req.body

    const validate = userCreateSchema.safeParse(req.body)

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
      password: passHash,
      role_id: role
    })

    res.status(200).json({
      message: "Usuario Creado", body: [{ message: "Usuario Creado" }]
    })


  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que actualiza un usuario
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { username, name, lastname, password, role: role_id } = req.body
    await Users.sync()

    const opdata = { password, role_id }

    // Eliminar la contraseña si no existe
    if (opdata.password == undefined) delete opdata.password
    else opdata.password = await bcry.hash(password, 8);

    // Eliminar el rol si no existe
    if (opdata.role_id == undefined) delete opdata.role_id


    const validate = userCreateSchema.safeParse({ username, name, lastname, ...opdata })

    if (validate.error) {
      const errors = validate.error.errors.map(ele => ({ message: ele.message }))

      return res.status(401).json({ message: "error", body: errors })
    }

    const result = await Users.update(
      {
        nombre_usuario: username,
        nombre: name,
        apellido: lastname,
        ...opdata
      },
      {
        where: { id_user: id }
      }
    )

    if (result[0] == 0)
      return res.status(403).json({ message: "No se pudo actualizar la informacion", body: [{ message: "No se pudo actualizar la informacion" }] })

    res.status(200).json({ message: "Informacion actulizada", body: [{ message: "Informacion actulizada" }] })

  } catch (error) {
    console.log({ error });
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que elimina un usuario
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await Users.sync()

    const result = await Users.findOne({ where: { id_user: id } })

    if (result == null)
      return res.status(403).json({ message: "Usuario no encontrado", body: [{ message: "Usuario no encontrado" }] })


    const deluser = await Users.destroy({ where: { id_user: id } })

    if (deluser != 1)
      return res.status(403).json({ message: "Usuario no encontrado", body: [{ message: "Usuario no encontrado" }] })

    res.status(200).json({ message: "ok", body: [{ message: "Usuario eliminado" }] })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

export { createUser, deleteUser, getUser, getUsers, updateUser }
