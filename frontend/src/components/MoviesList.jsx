import { useEffect, useState } from "react";
import Movie from "../models/Movie";
import { getAllMovies } from "../services/movieService";

export default function MovieList({ setCurrentPage, setMovie }) {
  const [movieList, setMovieList] = useState([]); //Nos creamos el estado MovieList para poder renderizar la lista de peliculas.

  const handleMoviePage = (movie) => { //Creamos una funcion para actualizar la pagina actual y la pelicula. Nos moverá a la pagian de detalle de la pelicula seleccionada.
    setCurrentPage(2);
    setMovie(movie);
  };

  useEffect(() => { //useEffect para renderizar al inicio la lista de peliculas
    getMovies();
  }, []);

  const getMovies = async () => { //Recibimos la peticion y creamos un array con los datos. Luego, actualizamos el estado con el resultado.
    const result = await getAllMovies();
    const movieArray = result.status.map(
      (movie) =>
        new Movie(
          movie.imdb,
          movie._id,
          movie.title,
          movie.year,
          movie.director,
          movie.plot,
          movie.genres,
          movie.poster
        )
    );
    setMovieList(movieArray);
  };

  return (
    <div>
      <ul>
        {movieList.map((movie) => {
          return (
            <li key={movie._id}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={{ width: "12em" }}
                onClick={() => handleMoviePage(movie)}
              />
              <h3>{movie.title}</h3>
              <h5>{movie.year}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
