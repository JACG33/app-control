import SequelizeStoreConstructor from "connect-session-sequelize";
import session from "express-session";

import { app } from "../app.js";
import { sequelize } from "../db/connection.js";

const SequelizeStore = SequelizeStoreConstructor(session.Store);
const checkExpire = 1000 * 60 * 60;
const sessionStore = new SequelizeStore({
  db: sequelize,
  // Whether or not to automatically check for and clear expired sessions:
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: checkExpire,
  // The maximum age of a valid session; milliseconds:
  expiration: 604800000,
});


sessionStore.sync();
const makeSession = () => {
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      key: "cookie_user",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        expires: 604800000,
      },
    })
  );
}

export { makeSession, sessionStore };

