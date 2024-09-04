interface ParamsRequest {
  headers?: { [key: string]: string };
  moreheaders?: object;
  method?: string;
  body?: string | object;
  files?: boolean;
  endpoint: string;
}

export class FetchReq {
  private fetchSol = ({
    endpoint = "",
    method = "GET",
    body = {},
    files = false,
    moreheaders = {},
  }: ParamsRequest) => {
    const headers = {
      "Content-type": "application/json",
      ...moreheaders,
    };
    const fetchParams: RequestInit = { method, headers };

    if (!files && Object.keys(body).length > 0) {
      fetchParams.body = JSON.stringify(body);
    }

    if (files) {
      delete fetchParams.headers;
      fetchParams.body = body as BodyInit;
    }

    return fetch(endpoint, fetchParams)
      .then((res) => {
        if (!res.ok) return res;
        return res;
      })
      .catch((res) => res);
  };

  /**
   * Metodo de tipo Get
   * @param {Object} opt Objeto de Opciones.
   * @param {String} opt.endpoint Endpoint a realizar la request.
   * @param {Object} opt.moreheaders Objeto de headers a enviar por defecto tiene el __"Content-type":"application/json"__.
   * @returns response
   */
  get({
    endpoint = "",
    moreheaders = {},
  }: {
    endpoint: string;
    moreheaders?: object;
  }) {
    return this.fetchSol({ endpoint, moreheaders });
  }

  /**
   * Metodo de tipo POST
   * @param {Object} opt Objeto de Opciones.
   * @param {String} opt.endpoint Endpoint a realizar la request.
   * @param {Object} opt.moreheaders Objeto de headers a enviar por defecto tiene el __"Content-type":"application/json"__.
   * @param {Object} opt.body Body de la request.
   * @param {Boolean} opt.files Boolean que indica si se envian archivos.
   * @returns response
   */
  post({
    endpoint = "",
    body = {},
    files = false,
    moreheaders = {},
  }: {
    endpoint: string;
    body: object;
    files?: boolean;
    moreheaders?: object;
  }) {
    return this.fetchSol({
      endpoint,
      method: "POST",
      body,
      files,
      moreheaders,
    });
  }

  /**
   * Metodo de tipo PUT
   * @param {Object} opt Objeto de Opciones.
   * @param {String} opt.endpoint Endpoint a realizar la request.
   * @param {Object} opt.moreheaders Objeto de headers a enviar por defecto tiene el __"Content-type":"application/json"__.
   * @param {Object} opt.body Body de la request.
   * @returns response
   */
  put({
    endpoint = "",
    body = {},
    moreheaders = {},
  }: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }) {
    return this.fetchSol({ endpoint, method: "PUT", body, moreheaders });
  }

  /**
   * Metodo de tipo DELETE
   * @param {Object} opt Objeto de Opciones.
   * @param {String} opt.endpoint Endpoint a realizar la request.
   * @param {Object} opt.moreheaders Objeto de headers a enviar por defecto tiene el __"Content-type":"application/json"__.
   * @param {Object} opt.body Body de la request.
   * @returns response
   */
  del({
    endpoint = "",
    body = {},
    moreheaders = {},
  }: {
    endpoint: string;
    body: object;
    moreheaders?: object;
  }) {
    return this.fetchSol({ endpoint, method: "DELETE", body, moreheaders });
  }
}
