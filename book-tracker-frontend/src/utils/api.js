class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");
    return {
      ...this._headers,
      authorization: token ? `Bearer ${token}` : "",
    };
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json().then((parsedRes) => {
      return parsedRes.data ? parsedRes.data : parsedRes;
    });
  }

  getUserInfo() {
    console.log("💻 Servidor Falso: Simulando obtener info de usuario...");
    return new Promise((resolve) => {
      setTimeout(() => {
        // Le devolvemos a React un usuario inventado para que no se rompa
        resolve({
          _id: "123",
          email: "usuario@frontend.com",
          name: "Estrella del Código",
        });
      }, 500);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then(this._checkResponse)
      .then((cards) => cards.map((card) => this._normalizeCard(card)));
  }
}

const api = new Api({
  baseUrl: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
