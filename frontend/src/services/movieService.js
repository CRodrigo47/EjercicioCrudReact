import { BASEURL } from "../constants/movie-URL";

const getAllMovies = async () => { //Funcion para coger todas las peliculas
  try {
    const response = await fetch(BASEURL, { method: "GET" });

    if (!response.ok) {
      throw new Error("Error al cargar las peliculas");
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error: " + err);
  }
};

const addMovie = async (movie) => { //Funcion para añadir una pelicula
  try {
    const response = await fetch(BASEURL, {
      method: "POST",
      body: JSON.stringify({
        imdb: movie.imdb,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        plot: movie.plot,
        genres: movie.genres,
        poster: movie.poster
      }),
    });

    if (!response.ok) {
      throw new Error("Error al crear la pelicula");
    }

    const result = await response.json();

    return result;
  } catch (err) {
    console.error("Error: " + err);
  }
};

const editMovie = async (movie) => { //Funcion para editar una pelicula
  try {
    const response = await fetch(BASEURL + "/" + movie.id, {
      method: "PUT",
      body: JSON.stringify({
        imdb: movie.imdb,
        title: movie.title,
        year: movie.year,
        director: movie.director,
        plot: movie.plot,
        genres: movie.genres,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la pelicula");
    }

    const result = await response.json;

    return result;
  } catch (err) {
    console.error(err);
  }
};

const deleteMovie = async (id) => { //Funcion para eliminar una pelicula
    try {
      const response = await fetch(BASEURL + "/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la pelicula");
      }

      const result = await response.json;

      return result;
    } catch (err) {
      console.error(err);
    }
  };

export { getAllMovies, addMovie, editMovie, deleteMovie }; //Exportamos las funciones para usarlas donde plazca
