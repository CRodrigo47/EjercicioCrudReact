/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BASEURL } from "../constants/movie-URL";

export default function Movie({ movie }) {
  //Recibimos la pelicula que hemos actualizado en la lista de peliculas.
  const [editMode, setEditMode] = useState(false);
  const [movieEdit, setMovieEdit] = useState(movie)
  const [genresList, setGenresList] = useState([]); // Estado para los géneros disponibles, que usaremos en el useEffect para la api de generos.
  const [selectedGenre, setSelectedGenre] = useState(""); // Estado para el género seleccionado, que lo usaremos para añadirlo al array anterior de generos.

  useEffect(() => {
       getGenres();
    }, []);
  
    const getGenres = async () => {
      // Llamada a la API para obtener los géneros
      const response = await fetch(BASEURL + "/genres", {method: "GET"}); // Asegúrate de reemplazar con la URL correcta
      const data = await response.json();
      setGenresList(data.status); // Suponiendo que la API devuelve una lista de géneros
    };

  const handleImdbRating = (e) => {
    const newRating = e.target.value; //Nos guardamos el valor en una variable...
    setMovieEdit((prevState) => ({
      //Para despues actualizar la pelicula, cogiendo los datos de una copia del estado actual (prevState) y añadiendolos con el nuevo valor.
      ...prevState,
      imdb: {
        ...prevState.imdb,
        rating: newRating,
      },
    }));
  };

  const handleImdbVotes = (e) => {
    const newVotes = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      imdb: {
        ...prevState.imdb,
        votes: newVotes,
      },
    }));
  };

  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      title: newTitle,
    }));
  };

  const handleYear = (e) => {
    const newYear = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      year: newYear,
    }));
  };

  const handleDirector = (e) => {
    const newDirector = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      director: newDirector,
    }));
  };

  const handlePlot = (e) => {
    const newPlot = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      plot: newPlot,
    }));
  };

  const handleGenreSelect = () => {
    if (selectedGenre && !movieEdit.genres.includes(selectedGenre)) { //Comprobamos si un genero ha sido seleccionado y ademas si la pelicula no lo incluye en sus generos, para no repetirlo.
      setMovieEdit((prevState) => ({
        ...prevState,
        genres: [...prevState.genres, selectedGenre], // Añadir el género seleccionado al array
      }));
    }
  };

  const handlePoster = (e) => {
    const newPoster = e.target.value;
    setMovieEdit((prevState) => ({
      ...prevState,
      poster: newPoster,
    }));
  };

  if (editMode) {
    return (
      <>
      <div className="inputs">
        <p>Link del poster</p>
        <input type="text" onChange={handlePoster} value={movie.poster}/>
        <p>Titulo</p>
        <input type="text" onChange={handleTitle} value={movie.title}/>
        <p>Año</p>
        <input type="number" onChange={handleYear} value={movie.year}/>
        <p>Director</p>
        <input type="text" onChange={handleDirector} value={movie.director}/>
        <p>Plot</p>
        <input type="text" onChange={handlePlot} value={movie.plot}/>
        <p>Generos</p>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Selecciona un género</option>
          {genresList.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button onClick={handleGenreSelect}>Añadir género</button>
        <div className="imdb">
          <p>Rating</p>
          <input type="number" onChange={handleImdbRating} value={movie.imdb.rating}/>
          <p>Votos</p>
          <input type="number" onChange={handleImdbVotes} value={movie.imdb.votes}/>
        </div>
      </div>
      </>
    );
  }
  return (
    <>
      <img src={movie.poster} alt={movie.title} style={{ width: "12em" }} />
      <h1>{movie.title}</h1>
      <h3>{movie.plot}</h3>
      <h5>{movie.year}</h5>
      <h5>{movie.director}</h5>
      <div>
        <section>
          {movie.genres.map(
            (
              g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
            ) => (
              <p key={g}>{g}</p>
            )
          )}
        </section>
        <p>{movie.imdb.rating}</p>
        <p>{movie.imdb.votes}</p>
      </div>
      <button onClick={() => setEditMode(true)}>EDITAR PELICULA</button>
    </>
  );
}
