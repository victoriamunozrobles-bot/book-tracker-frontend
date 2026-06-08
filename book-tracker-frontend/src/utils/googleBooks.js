export const searchGoogleBooks = (searchQuery) => {
  const formattedQuery = searchQuery.split(" ").join("+");

  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&maxResults=10`,
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error al buscar en Google Books: ${res.status}`);
    })
    .then((data) => {
      return data.items || [];
    });
};
