//export const BASE_URL = "http://localhost:5173";

export const register = (name, email, password) => {
  console.log("💻 Servidor Falso: Registrando a", name);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { _id: "123", email: email, name: name } });
    }, 1000);
  });
};

export const authorize = (email, password) => {
  console.log("💻 Servidor Falso: Iniciando sesión de", email);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: "mi-token-super-secreto-12345" });
    }, 1000);
  });
};

export const checkToken = (token) => {
  console.log("💻 Servidor Falso: Validando el token guardado...");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: { email: "usuario@ejemplo.com", name: "Lector Estrella" },
      });
    }, 500);
  });
};
