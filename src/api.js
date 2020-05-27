const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getTasks() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://11.ecmascript.pages.academy/big-trip`, {headers})
      .then((response) => response.json());
  }
};

export default API;