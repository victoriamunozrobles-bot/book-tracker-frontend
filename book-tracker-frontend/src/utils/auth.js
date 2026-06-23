export const BASE_URL = "https://6a398c2864a2d82692241d25.mockapi.io/users";

export const register = async (name, email, password) => {
  const resGet = await fetch(BASE_URL);
  const users = await resGet.json();

  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    alert("Este correo ya está registrado. Por favor, inicia sesión.");
    return Promise.reject("El usuario ya existe");
  }

  const resPost = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (resPost.ok) {
    return resPost.json();
  } else {
    return Promise.reject(`Error: ${resPost.status}`);
  }
};

export const authorize = async (email, password) => {
  const res = await fetch(BASE_URL);
  const users = await res.json();

  const validUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (validUser) {
    return { token: `token-simulado-${validUser.email}` };
  } else {
    alert("Correo o contraseña incorrectos.");
    return Promise.reject("Credenciales inválidas");
  }
};

export const checkToken = async (token) => {
  if (token && token.startsWith("token-simulado-")) {
    const userEmail = token.replace("token-simulado-", "");
    return { data: { email: userEmail } };
  }
  return Promise.reject("Token inválido");
};
