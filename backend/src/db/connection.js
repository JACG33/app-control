import { Sequelize } from "sequelize";

const host = process.env.DB_HOST
const dialect = process.env.DB_DIALECT
const db = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS

const sequelize = new Sequelize(db, user, pass,
  {
    host,
    dialect
  }
)

export { sequelize }