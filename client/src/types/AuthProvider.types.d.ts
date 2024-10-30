export interface SessionAuth {
  status: boolean;
  accessToken: string;
  refreshToken: string;
  userId: string;
  userRol: string;
  userName: string;
}

export interface AuthContexProv {
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