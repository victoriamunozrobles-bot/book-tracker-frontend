const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (query) => {
  try {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}?q=${query}&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.warn("La búsqueda no devolvió resultados.");
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error al comunicarse con la API de Google Books:", error);
    throw error;
  }
};
