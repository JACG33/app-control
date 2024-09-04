import { request } from 'express'

/**
 * Funcion que genera una painacion.
 * @param {Object} opc Objeto de opciones.
 * @param {request} opc.req Objeto de la request.
 * @param {String} opc.apiUrl Path de la ruta.
 * @example opc.apiUrl por defecto se genera http://localhost:3000/ simplemente se necesita el path ejemplo api/users, quedando http://localhost:3000/api/users
 * @returns Object Objeto con la paginacion e informacion adicional.
 */
export const makePagination = async ({ req, model, apiUrl }) => {
  const { limit = 5, page = 1 } = req.query

  // Obtener total de filas del modelo
  const countUsers = await model.count()

  if (countUsers <= 0) {
    return {
      offset,
      limit,
      pagination: {

      }
    }
  }

  // refPage es para evitar mutar el page que se obtiene de la query de la requeste
  const refPage = page
  // Offes sera la posicion de la fila en la consulta
  const offset = (refPage - 1) * limit

  let lastNum = Math.ceil((countUsers / limit))
  // let lastNum = (countUsers / limit)
  let prevNum = Number(page) - 1 == 0 ? 1 : Number(page) - 1
  let nextNum = Number(page) + 1 > lastNum ? lastNum : Number(page) + 1

  const baseUrl = `${req.protocol}://${req.get("host")}/${apiUrl}`
  const prevPage = `${baseUrl}?limit=${limit}&page=${prevNum}`
  const nextPage = `${baseUrl}?limit=${limit}&page=${nextNum}`
  const lastPage = `${baseUrl}?limit=${limit}&page=${lastNum}`
  const firstPage = `${baseUrl}?limit=${limit}&page=1`
  const totalPage = lastNum
  const currentNumberPage=Number(page)

  return {
    offset,
    limit,
    pagination: {
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      baseUrl,
      limit: Number(limit),
      totalRecords: countUsers,
      totalPage,
      currentNumberPage
    }
  }
}
