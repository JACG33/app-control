import { createContext, useEffect, useState } from "react";
import { FetchReq } from "../helpers/httpHelp";

interface SessionAuth {
  status: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
  userRol: string;
  userName: string;
}

interface AuthContex {
  sessionAuth: SessionAuth;
  setLogged(params: {
    tokenAccess: string;
    tokenRefresh: string;
    userId: string;
    rol: string;
    userName: string;
  }): void;
  logUt(): void;
  getHttp(params: {
    endpoint: string;
    moreheaders?: object;
  }): Promise<Response>;
  postHttp(params: {
    endpoint: string;
    body: object;
    files?: boolean;
    moreheaders?: object;
  }): Promise<Response>;
  putHttp(params: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }): Promise<Response>;
  deleteHttp(params: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }): Promise<Response>;
}

export const AuthContex = createContext<AuthContex>({
  sessionAuth: {
    status: false,
    accessToken: "",
    refreshToken: "",
    userId: "",
    userRol: "",
    userName: "",
  },
  setLogged: () => {},
  logUt: () => {},
  getHttp: async () => new Response(),
  postHttp: async () => new Response(),
  putHttp: async () => new Response(),
  deleteHttp: async () => new Response(),
});

interface AuthProvider {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider: React.FC<AuthProvider> = ({ children }) => {
  const [sessionAuth, setSessionAuth] = useState({
    status: false,
    accessToken: "",
    refreshToken: "",
    userId: "",
    userRol: "",
    userName: "",
  });

  const reqHelp = new FetchReq();

  useEffect(() => {
    if (verifyTokenSession() == "auth") {
      setLogged({
        rol: "",
        tokenAccess: "",
        tokenRefresh: "",
        userId: "",
        userName: "",
      });
    }
  }, []);

  const verifyTokenSession = () => {
    const tokenAcc = window.localStorage.getItem("tokenAccess");
    const tokenRef = window.localStorage.getItem("tokenRefresh");
    const userid = window.localStorage.getItem("userid");
    const userrol = window.localStorage.getItem("userrol");
    let errors = 0;
    if (!tokenAcc) errors++;
    if (!tokenRef) errors++;
    if (!userid) errors++;
    if (!userrol) errors++;

    if (errors > 0) return "unauth";
    else return "auth";
  };

  const setLogged = ({
    tokenAccess = "",
    tokenRefresh = "",
    userId = "",
    rol = "",
    userName = "",
  }: {
    tokenAccess: string;
    tokenRefresh: string;
    userId: string;
    rol: string;
    userName: string;
  }) => {
    const tokenAcc = window.localStorage.getItem("tokenAccess");
    const tokenRef = window.localStorage.getItem("tokenRefresh");
    const userid = window.localStorage.getItem("userid");
    const userrol = window.localStorage.getItem("userrol");
    const username = window.localStorage.getItem("username");

    const tmpSession = {
      status: false,
      accessToken: "",
      refreshToken: "",
      userId: "",
      userRol: "",
      userName: "",
    };

    // AccesToken
    if (!tokenAcc) {
      window.localStorage.setItem("tokenAccess", JSON.stringify(tokenAccess));
      tmpSession.accessToken = tokenAccess;
    } else {
      tmpSession.accessToken = JSON.parse(tokenAcc);
    }

    // RefreshToken
    if (!tokenRef) {
      window.localStorage.setItem("tokenRefresh", JSON.stringify(tokenRefresh));
      tmpSession.refreshToken = tokenRefresh;
    } else {
      tmpSession.refreshToken = JSON.parse(tokenRef);
    }

    // UserId
    if (!userid) {
      window.localStorage.setItem("userid", JSON.stringify(userId));
      tmpSession.userId = userId;
    } else {
      tmpSession.userId = JSON.parse(userid);
    }

    // UserTol
    if (!userrol) {
      window.localStorage.setItem("userrol", JSON.stringify(rol));
      tmpSession.userRol = rol;
    } else {
      tmpSession.userRol = JSON.parse(userrol);
    }

    // UserName
    if (!username) {
      window.localStorage.setItem("username", JSON.stringify(userName));
      tmpSession.userName = userName;
    } else {
      if (username) tmpSession.userName = JSON.parse(username);
    }

    tmpSession.status = true;

    setSessionAuth(tmpSession);
  };

  const logUt = () => {
    window.localStorage.removeItem("tokenAccess");
    window.localStorage.removeItem("tokenRefresh");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("userrol");
    window.localStorage.removeItem("username");

    setSessionAuth({
      status: false,
      accessToken: "",
      refreshToken: "",
      userId: "",
      userRol: "",
      userName: "",
    });
  };

  const verifyErrors = async (error: unknown) => {
    if (error instanceof Response && typeof error.json === "function") {
      const errorCloned = error.clone();
      const message = await errorCloned.json();
      if (message.mesagge == "Session out") {
        console.log("unaut");
        logUt();
        return;
      }
      return error;
    }
  };

  /**
   *
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.endpoint Url de la request.
   * */
  const getHttp = async ({
    endpoint,
    moreheaders,
  }: {
    endpoint: string;
    moreheaders?: object;
  }) => {
    try {
      const res = await reqHelp.get({ endpoint, moreheaders });
      if (!res.ok) throw res;
      return res;
    } catch (error) {
      return verifyErrors(error);
    }
  };

  /**
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.endpoint Url de la request.
   * @param {Object} opc.headersOpt Objeto de Headers a enviar en la request.
   * @param {Object} opc.body Cuerpo de la request.
   * @param {Boolean} opt.files Boolean que indica si se envian archivos.
   * @returns Object Objeto con la respuesta.
   *
   * */
  const postHttp = async ({
    endpoint,
    body,
    files,
    moreheaders,
  }: {
    endpoint: string;
    body: object;
    files?: boolean;
    moreheaders?: object;
  }) => {
    try {
      const res = await reqHelp.post({ endpoint, body, files, moreheaders });
      if (!res.ok) throw res;
      return res;
    } catch (error) {
      return verifyErrors(error);
    }
  };

  /**
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.endpoint Url de la request.
   * @param {Object} opc.headersOpt Objeto de Headers a enviar en la request.
   * @param {Object} opc.body Cuerpo de la request.
   * @returns Object Objeto con la respuesta.
   *
   * */
  const putHttp = async ({
    endpoint,
    body,
    moreheaders,
  }: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }) => {
    try {
      const res = await reqHelp.put({ endpoint, body, moreheaders });
      if (!res.ok) throw res;
      return res;
    } catch (error) {
      return verifyErrors(error);
    }
  };

  /**
   * @param {Object} opc Objeto de opciones.
   * @param {String} opc.endpoint Url de la request.
   * @param {Object} opc.headersOpt Objeto de Headers a enviar en la request.
   * @param {Object} opc.body Cuerpo de la request.
   * @returns Object Objeto con la respuesta.
   *
   * */
  const deleteHttp = async ({
    endpoint,
    body,
    moreheaders,
  }: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }) => {
    try {
      const res = await reqHelp.del({ endpoint, body, moreheaders });
      if (!res.ok) throw res;
      return res;
    } catch (error) {
      return verifyErrors(error);
    }
  };

  return (
    <AuthContex.Provider
      value={{
        sessionAuth,
        setLogged,
        logUt,
        getHttp,
        postHttp,
        putHttp,
        deleteHttp,
      }}
    >
      {children}
    </AuthContex.Provider>
  );
};
