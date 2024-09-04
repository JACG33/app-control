import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import uploadStyles from "./uploads.module.css";
import { OutletContext } from "../../../types/Uploads.types";

interface Item {
  id: string | number | undefined;
  src: string | undefined;
  alt: string | undefined;
  filename: string | undefined;
  path?: string | undefined;
}

const Item: React.FC<Item> = ({ id, src, alt, filename }) => {
  const imgRef = useRef<HTMLDivElement | null>(null);
  const { deleteFile, setLoading } = useOutletContext() as OutletContext;

  const removeItem = () => imgRef?.current?.remove();

  return (
    <div ref={imgRef} className={`${uploadStyles.cont__img}`}>
      <button
        className={`${uploadStyles.btn__img__interact}`}
        type="button"
        onClick={() => {
          setLoading(true);
          deleteFile(id).then((res: number) => (res === 1 ? removeItem : ""));
        }}
      >
        X
      </button>
      <img
        loading="lazy"
        className="h-40 m-auto object-cover"
        src={src}
        alt={alt}
      />
      <span>{filename}</span>
    </div>
  );
};

export default Item;
