import { makePagination } from "../../helpers/makePagination.js";
import Roles from "../../models/Roles.js";

/**
 * Funcion que obtiene todos los roles
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const getRoles = async (req, res) => {
  try {
    await Roles.sync({ force: false })

    const pagination = makePagination({ apiUrl: "api/roles", model: Roles, req })

    const result = await Roles.findAll({
      attributes: ["id", "role_name"], limit: Number((await pagination).limit),
      offset: (await pagination).offset,
    })

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
 * Fucion que obtiene un rol
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const getRole = async (req, res) => {
  try {
    const { id } = req.params
    await Roles.sync()

    const result = await Roles.findOne({ where: { id } })

    if (result == null)
      return res.status(403).json({ message: "Rol no encontrado", body: [{ message: "Rol no encontrado" }] })

    res.status(200).json({ message: "ok", body: result })
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que crea un nuevo rol
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const createRole = async (req, res) => {
  try {
    const { rolname } = req.body

    await Roles.sync({})

    const result = await Roles.create({
      role_name: rolname
    })

    res.status(200).json({ message: "Rol creado", body: [{ message: "Rol creado" }] })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que actualiza un rol
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { rolname } = req.body
    await Roles.sync()

    const result = await Roles.update(
      {
        role_name: rolname
      },
      {
        where: { id }
      }
    )

    if (result[0] == 0)
      return res.status(403).json({ message: "No se pudo actualizar la informacion", body: [] })

    res.status(200).json({ message: "Informacion actulizada", body: [{ message: "Informacion actulizada" }] })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

/**
 * Fucion que elimina un rol
 * @param {Request} req Request
 * @param {Response} res Response 
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    await Roles.sync()

    const delrol = await Roles.destroy({ where: { id } })

    if (delrol != 1)
      return res.status(403).json({ message: "Rol no encontrado", body: [{ message: "Rol no encontrado" }] })

    res.status(200).json({ message: "ok", body: [{ message: "Rol eliminado" }] })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
}

export { getRoles, getRole, createRole, updateRole, deleteRole }