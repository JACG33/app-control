# 09-SEP_2014

+ Añadi un nuevo controlador, asi como una nueva route/api con el nombre irrelevant, el objetivo de esta implementacion seria para peticiones de cualquier tipo.
+ Añadi nuevos svg en esta ocacion para utilizarlos en la pagina __overview__.
+ Movi el archivo __overview__ a una carpeta con el mismo nombre para agrupar los archivos necesarios en un solo lugar.

# 05-SEP-2024

+ Separe el input de tipo __password__ en un componente aparte, se ubica en la carpeta components/form-inputs
+ Cree un nuevo __Context__ para el componente tabla, el objetivo de esto es un componete reutilizable pero en el lugar donde lo quiero aplicar que es en usuarios y roles la logica interna de las __tablas__ varia el codigo es igual pero no al renderizar la tabla me encuentro con que uno de los objetos tine "niveles" de acceso de tipo 2, pero buscare la forma de solucionar y asi tener un solo componente de la tabla.
  ```ts
  interface Data {
    id_user: string;
    nombre_usuario: string;
    nombre: string;
    apellido: string;
    Role: {
      role_name: string;
    };
  }

  interface Data {
    id: string;
    role_name: string;
  }

  ```
+ Corregi un error en el controlador de autenticacion.