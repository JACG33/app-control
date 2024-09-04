export interface ResponseHttp {
  error?: { message: string; body: [] };
  ok?: unknown;
  message?: string;
  body?: Array<unknown> | { message: string }[];
  // json():unknown
}

export interface LoginResponse {
  body: {
    accessToken: string;
    refreshToken: string;
    userData: {
      id_user: string;
      user_rol: string;
      user_name: string;
    };
  }[];
}

export interface ErrorResponseHttp {
  message: string;
  body: { message: string }[];
}

export interface StateError {
  typeMessage: string;
  messages: { message: string }[];
}
