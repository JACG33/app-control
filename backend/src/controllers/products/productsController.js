import { Products } from "../../models/Products.js"

/**
 * Funcion que obtiene todos los productos
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getProducts = async (req, res) => {
  try {
    await Products.sync({ force: false })
    const result = await Products.findAll()
    res.json({
      message: "Ok",
      body: result
    })
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error",body:[{message: "Ocurrio un error"}] })
  }
}

/**
 * Fucion que obtiene un producto
 * @param {Request} req Request
 * @param {Response} res Response
 */
const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Products.sync()

    const result = await Products.findOne({ where: { id } })

    res.json({ message: "ok", body: result })
  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error",body:[{message: "Ocurrio un error"}] })
  }
}

/**
 * Fucion que crea un nuevo producto
 * @param {Request} req Request
 * @param {Response} res Response
 */
const createProduct = async (req, res) => {
  try {
    const { name, cantidad } = req.body

    await Products.sync({})

    const result = await Products.create({
      nombre: name,
      cantidad,
    })

    res.json({ message: "ok", body: result })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error",body:[{message: "Ocurrio un error"}] })
  }
}

/**
 * Fucion que actualiza un producto
 * @param {Request} req Request
 * @param {Response} res Response
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, cantidad } = req.body
    await Products.sync()

    const result = await Products.update(
      {
        nombre: name,
        cantidad,
      }, {
      where: { id }
    })

    res.json({ message: "ok", body: result })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error",body:[{message: "Ocurrio un error"}] })
  }
}

/**
 * Fucion que elimina un producto
 * @param {Request} req Request
 * @param {Response} res Response
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    await Products.sync()

    const result = await Products.destroy({ where: { id } })

    res.json({ message: "ok", body: result })

  } catch (error) {
    res.status(403).json({ message: "Ocurrio un error",body:[{message: "Ocurrio un error"}] })
  }
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }