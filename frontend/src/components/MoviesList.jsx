/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Movie from "../models/Movie";
import { getAllMovies } from "../services/movieService";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({ setCurrentPage, setMovie }) {
  const [movieList, setMovieList] = useState([]); //Nos creamos el estado MovieList para poder renderizar la lista de peliculas.

  const handleMoviePage = (movie) => {
    //Creamos una funcion para actualizar la pagina actual y la pelicula. Nos moverá a la pagian de detalle de la pelicula seleccionada.
    setCurrentPage(2);
    setMovie(movie);
  };

  useEffect(() => {
    //useEffect para renderizar al inicio la lista de peliculas
    getMovies();
  }, []);

  const getMovies = async () => {
    //Recibimos la peticion y creamos un array con los datos. Luego, actualizamos el estado con el resultado.
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
    <div className="container-list">
      {movieList.map((movie) => {
        return (
          <div key={movie.id}>
            <MovieCard movie={movie} handleMovieChange={handleMoviePage} />
          </div>
        );
      })}
    </div>
  );
}
