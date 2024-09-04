import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { unlinkSync } from "fs";
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Funcion que hace cambia de tamaño una imagen.
 * @param {Object} opc Objecto de opciones.
 * @param {String} originOfFile Ruta en la que se guardo la imagen subida
 * @param {String} name Nombre la imagen subida
 * @param {String} prefix Prefijo que se le asignara al archivo
 * @param {Number} size Dimencion de la imagen
 * @returns 
 */
export const resizeImg = ({ originOfFile = "", name = "", prefix = "", size = 300 }) =>
  sharp(originOfFile)
    .resize(size)
    .toFile(join(__dirname, `../uploads/images/${prefix}-${name}`));

/**
 * 
 * @param {String} filePath Nombre del Archivo
 * @param {String} fileFolder Nombre de la Carpeta
 */
export const deleteFile = (filePath = "", fileFolder = "") => {
  try {
    unlinkSync(join(__dirname, `../uploads/${fileFolder}/${filePath}`));
  } catch (error) {
    console.log("dele++++++++++++", error);
  }
};
