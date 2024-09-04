interface RoleSchema {
  [key: string]: {
    pattern: string | RegExp;
    message: string;
  };
}
export const roleCreateSchema: RoleSchema = {
  rolname: {
    pattern: "/[^\\p{L}]{3,}/",
    message:
      "El nombre de usuario no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
};
