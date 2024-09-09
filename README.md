# App Control

Este proyecto/sistema integra ciertas secciones en la que implemente algunas cosas que fui aprendiendo, especialmente los WebSockets para una seccion de mensajes, ademas de eso utilizando la __CLI__ de __Sequelize__ para generar modelos de tablas y hacer migraciones mediante la consola, asi como en __Laravel__(y quizas en otros), reutilize algunas funcionalidades de otros proyectos que ya tengo aqui en mi GitHub, ademas de eso el Frontend lo hice con TypeScript (que estoy aprendiendo, pero previo a eso era __Javascript__), el inicio fue un poco engorroso pero a medida que fui migrando de __JS__ a __TS__ todo fue solucionandose.

El Backend y Frontend utilice __pnpm__ como gestor de paquetes.

Instalacion de dependencias
```bash
$ pnpm i
```
---
Development
```bash
$ pnpm run dev
```

Luego estando en la terminal acceder al directorio __backend/up_project__ y ejecutar en la teminal:
```bash
$ pnpx sequelize-cli db:migrate && pnpx sequelize-cli db:seed:all
```
Para hacer las migraciones y seeders de datos de prueba.