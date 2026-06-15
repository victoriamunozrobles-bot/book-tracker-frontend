const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = (query) => {
  const formattedQuery = query.split(" ").join("+");

  return fetch(
    `${GOOGLE_BOOKS_API_URL}?q=${formattedQuery}&maxResults=12&key=${API_KEY}`,
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Error al contactar con Google Books: ${res.status}`,
      );
    })
    .then((data) => {
      return data.items || [];
    });
};
