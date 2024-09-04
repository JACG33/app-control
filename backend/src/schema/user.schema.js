import z from "zod"

export const userCreateSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}]+/, {
    message: "El nombre de usuario tiene caracteres no permitidos"
  }),
  name: z.string().min(3, {
    message: "El nombre no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}\s.]+/, {
    message: "El nombre tiene caracteres no permitidos"
  }),
  lastname: z.string().min(3, {
    message: "El apellido no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}\s.]+/, {
    message: "El apellido tiene caracteres no permitidos"
  }),
  password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_.:*$-]{8,28}/, {
    message: "La contraseña no es valida"
  }).optional(),
  role_id: z.string().regex(/[0-9]/, {
    message: "Debe elegir un rol"
  }).optional(),
})

export const userRegisterSchema = z.object({
  username: z.string().min(3, {
    message: "El nombre de usuario no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}]+/, {
    message: "El nombre de usuario tiene caracteres no permitidos"
  }),
  name: z.string().min(3, {
    message: "El nombre no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}\s.]+/, {
    message: "El nombre tiene caracteres no permitidos"
  }),
  lastname: z.string().min(3, {
    message: "El apellido no puede tener menos de 3 caracteres o estar vacio"
  }).regex(/[^\p{L}\s.]+/, {
    message: "El apellido tiene caracteres no permitidos"
  }),
  password: z.string().regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_.:*$-]{8,28}/, {
    message: "La contraseña no es valida"
  })
})