export const SliceTextExtensionFile = (text = "", length = 7): string => {
  const ext = text.split(".").pop();
  const textreduce = text.slice(0, length);
  return `${textreduce}[...].${ext}`;
};

export const SliceText = ({ text = "", length = 7 }): string => {
  const textreduce = text.slice(0, length);
  return `${textreduce}[...]`;
};

export const SlugText = ({ text = "" }): string => {
  const REGEXP = /[\W]/g;
  let slug = text.trim().split(" ");
  for (let i = 0; i < slug.length; i++) slug[i] = slug[i].replace(REGEXP, "");
  slug = slug.filter((ele) => ele !== "");
  const slugJoined = slug.join("-");
  return slugJoined;
};

/**
 * Funciona para quitar signos de acentuacion de las palabras escritas por el usuario.
 * @param {string} texto Texto a quitar acentos.
 * @returns Texto si los acentos.
 */
export const EliminarAcentos = (texto = ""): string =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
