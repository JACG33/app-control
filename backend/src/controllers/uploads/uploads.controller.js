import { deleteFile, resizeImg } from "../../helpers/handleImg.js";
import Uploads from "../../models/Uploads.js";


/**
 * Funcion que guarda un archivo
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const CreateUpload = async (req, res) => {
  const file = req.files;
  console.log({ file });

  try {
    await Uploads.sync();
    let dataToUpload = [];
    file.forEach(async (ele) => {
      const nameFile = ele.filename
      let pathFile;
      let sizeFile = {};
      let typeFile;

      // Imagenes
      if (ele.mimetype.includes("image")) {
        // Establecer diferentes tamaños
        resizeImg({ originOfFile: ele.path, name: nameFile, prefix: "small", size: 150 });
        resizeImg({ originOfFile: ele.path, name: nameFile, prefix: "medium", size: 300 });
        resizeImg({ originOfFile: ele.path, name: nameFile, prefix: "large", size: 700 });

        pathFile = `${process.env.SITE_URL}/uploads/images/${nameFile}`;
        typeFile = "image";

        sizeFile = {
          small: `${process.env.SITE_URL}/uploads/images/small-${nameFile}`,
          medium: `${process.env.SITE_URL}/uploads/images/medium-${nameFile}`,
          large: `${process.env.SITE_URL}/uploads/images/large-${nameFile}`,
          original: `${process.env.SITE_URL}/uploads/images/${nameFile}`,
        };
      }

      // Documentos Pdf
      if (ele.mimetype.includes("pdf")) {
        pathFile = `${process.env.SITE_URL}/uploads/docs/${nameFile}`;
        typeFile = "docs";
      }

      // Archivos Comprimidos
      if (ele.mimetype.includes("zip") || ele.mimetype.includes("rar")) {
        pathFile = `${process.env.SITE_URL}/uploads/zips/${nameFile}`;
        typeFile = "zips";
      }

      dataToUpload.push({
        path: pathFile,
        nameFile,
        typeFile,
        sizeFile,
      });
    });

    let upload = await Uploads.bulkCreate(dataToUpload);

    if (upload.length == 0)
      return res
        .status(500)
        .json({ message: "Error al Guardadar el archivo", body: [{ message: "Error al Guardadar el archivo" }] });

    res.status(201).json({ message: "Archivo Guardado", body: [{ message: "Archivo Guardado" }], file: upload });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
};


/**
 * Funcion que obtine archivos
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const GetUploads = async (req, res) => {
  let typeGetFile = req.headers["x-type-file"];
  try {
    await Uploads.sync();
    const getUplodas = await Uploads.findAll({
      where: {
        typeFile: typeGetFile,
      },
      order: [["id", "DESC"]],
    });

    if (getUplodas.length == 0)
      return res
        .status(404)
        .json({ message: "No hay archivos", body: [{ message: "No hay archivos" }] });

    res.status(200).json({ message: "Archivos encontrados", body: getUplodas });

  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
};

/**
 * Funcion que obtine un archivo
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const GetUpload = async (req, res) => { };


/**
 * Funcion que elimina un archivo
 * @param {Request} req Request
 * @param {Response} res Response
 * @returns Json
 */
const DeleteUpload = async (req, res) => {
  const { id } = req.params;
  let typeGetFile = req.headers["x-type-file"];
  try {
    const find = await Uploads.findOne({
      where: { id: id },
    });

    if (!find.dataValues)
      return res
        .status(401)
        .json({ message: "El elemento no existe", status: 401, data: null });

    let paths;
    if (typeGetFile == "image") {
      paths = find.dataValues.sizeFile;
      Object.keys(paths).forEach((path) =>
        deleteFile(paths[path].split("/").pop(), "images")
      );
    }
    if (typeGetFile == "docs") {
      paths = find.dataValues.path;
      deleteFile(paths.split("/").pop(), "docs");
    }
    if (typeGetFile == "zips") {
      paths = find.dataValues.path;
      deleteFile(paths.split("/").pop(), "zips");
    }
    const deleteUpload = await Uploads.destroy({
      where: { id: id },
    });


    if (deleteUpload != 1)
      return res.status(403).json({ message: "Archivo no encontrado", body: [{ message: "Archivo no encontrado" }] })

    res.status(200).json({ message: "Archivo eliminado", body: [{ message: "Archivo eliminado" }] });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Ocurrio un error", body: [{ message: "Ocurrio un error" }] })
  }
};

export { CreateUpload, DeleteUpload, GetUpload, GetUploads };

