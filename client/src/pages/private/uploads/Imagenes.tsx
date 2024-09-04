import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Item from "./Item";
import SectionUpload from "./SectionUpload";
import { Files, OutletContext } from "../../../types/Uploads.types";

const Imagenes = () => {
  const { getFiles, typeFileAccept, fileStorage } =
    useOutletContext() as OutletContext;

  useEffect(() => {
    if (
      fileStorage[typeFileAccept.type as keyof typeof fileStorage]?.length === 0
    )
      getFiles();
  }, []);
  return (
    <SectionUpload>
      {fileStorage[typeFileAccept.type as keyof typeof fileStorage]?.length >
      0 ? (
        fileStorage[typeFileAccept.type as keyof typeof fileStorage]?.map(
          (file: Files) => (
            <Item
              key={file.id}
              id={file.id}
              src={file?.sizeFile?.small}
              alt={file.nameFile}
              filename={file.nameFileSlice}
              path={file.path}
            />
          )
        )
      ) : (
        <h2>No hay images cargadas</h2>
      )}
    </SectionUpload>
  );
};

export default Imagenes;
