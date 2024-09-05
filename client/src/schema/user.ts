interface UserSchema {
  [key: string]: {
    pattern: string | RegExp;
    message: string;
  };
}

export const userCreateSchema: UserSchema = {
  username: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El nombre de usuario no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  name: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El nombre no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  lastname: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El apellido no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  password: {
    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_.:*$-]{8,28}/,
    message: "La contraseña no puede ser menor a 8 caracteres o estar vacia",
  },
  role: {
    pattern: /[0-9]/,
    message: "Debe elegir un rol",
  },
};

export const userRegisterSchema: UserSchema = {
  username: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El nombre de usuario no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  name: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El nombre no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  lastname: {
    pattern: "[^\\p{L}]{3,}",
    message:
      "El apellido no puede tener menos de 3 caracteres o estar vacio, solo se permiten puntos como caracter adicional.",
  },
  password: {
    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_.:*$-]{8,28}/,
    message: "La contraseña no puede ser menor a 8 caracteres o estar vacia",
  },
};
