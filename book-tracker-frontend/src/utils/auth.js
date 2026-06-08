//export const BASE_URL = "http://localhost:5173";

export const register = (name, email, password) => {
  console.log("💻 Servidor Falso: Registrando a", name);

  // Retornamos una promesa falsa
  return new Promise((resolve) => {
    setTimeout(() => {
      // Le decimos a React: "¡Éxito! Aquí están los datos del registro"
      resolve({ data: { _id: "123", email: email, name: name } });
    }, 1000); // Simulamos 1 segundo de carga
  });
};

export const authorize = (email, password) => {
  console.log("💻 Servidor Falso: Iniciando sesión de", email);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Tu App.jsx espera un "data.token", así que se lo inventamos:
      resolve({ token: "mi-token-super-secreto-12345" });
    }, 1000);
  });
};

export const checkToken = (token) => {
  console.log("💻 Servidor Falso: Validando el token guardado...");

  return new Promise((resolve) => {
    setTimeout(() => {
      // Tu App.jsx usa res.data.email, así que le enviamos esa estructura:
      resolve({
        data: { email: "usuario@ejemplo.com", name: "Lector Estrella" },
      });
    }, 500);
  });
};
