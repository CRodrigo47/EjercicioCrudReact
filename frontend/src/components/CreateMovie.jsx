import { useEffect, useState } from "react";
import { addMovie } from "../services/movieService";
import Movie from "../models/Movie";
import { BASEURL } from "../constants/movie-URL";

export default function CreateMovie() {
  const [newMovie, setNewMovie] = useState(new Movie()); //Nos guardamos en un estado la nueva pelicula a añadir, para poder ir actualizando sus atributos con los handles.
  const [genresList, setGenresList] = useState([]); // Estado para los géneros disponibles, que usaremos en el useEffect para la api de generos.
  const [selectedGenre, setSelectedGenre] = useState(""); // Estado para el género seleccionado, que lo usaremos para añadirlo al array anterior de generos.

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    // Llamada a la API para obtener los géneros
    const response = await fetch(BASEURL + "/genres", { method: "GET" }); // Asegúrate de reemplazar con la URL correcta
    const data = await response.json();
    setGenresList(data.status); // Suponiendo que la API devuelve una lista de géneros
  };

  //La mecanica de handle se repite a lo largo de todos los atributos.
  const handleImdbRating = (e) => {
    const newRating = e.target.value; //Nos guardamos el valor en una variable...
    setNewMovie((prevState) => ({
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
    setNewMovie((prevState) => ({
      ...prevState,
      imdb: {
        ...prevState.imdb,
        votes: newVotes,
      },
    }));
  };

  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setNewMovie((prevState) => ({
      ...prevState,
      title: newTitle,
    }));
  };

  const handleYear = (e) => {
    const newYear = e.target.value;
    setNewMovie((prevState) => ({
      ...prevState,
      year: newYear,
    }));
  };

  const handleDirector = (e) => {
    const newDirector = e.target.value;
    setNewMovie((prevState) => ({
      ...prevState,
      director: newDirector,
    }));
  };

  const handlePlot = (e) => {
    const newPlot = e.target.value;
    setNewMovie((prevState) => ({
      ...prevState,
      plot: newPlot,
    }));
  };

  const handleGenreSelect = () => {
    if (selectedGenre && !newMovie.genres.includes(selectedGenre)) {
      //Comprobamos si un genero ha sido seleccionado y ademas si la pelicula no lo incluye en sus generos, para no repetirlo.
      setNewMovie((prevState) => ({
        ...prevState,
        genres: [...prevState.genres, selectedGenre], // Añadir el género seleccionado al array
      }));
    }
  };

  const handlePoster = (e) => {
    const newPoster = e.target.value;
    setNewMovie((prevState) => ({
      ...prevState,
      poster: newPoster,
    }));
  };

  const handleAddMovie = async () => {
    const movieToAdd = new Movie(
      newMovie.imdb,
      newMovie.title,
      newMovie.year,
      newMovie.director,
      newMovie.plot,
      newMovie.genres,
      newMovie.poster
    );

    const response = await addMovie(movieToAdd);
    console.log(response);
  };

  return (
    <>
      <div className="header">
        <h1>CREAR PELICULA</h1>
      </div>
      <div className="inputs">
        <p>Link del poster</p>
        <input type="text" onChange={handlePoster} />
        <p>Titulo</p>
        <input type="text" onChange={handleTitle} />
        <p>Año</p>
        <input type="number" onChange={handleYear} />
        <p>Director</p>
        <input type="text" onChange={handleDirector} />
        <p>Plot</p>
        <input type="text" onChange={handlePlot} />
        <p>Generos</p>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
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
          <input type="number" onChange={handleImdbRating} />
          <p>Votos</p>
          <input type="number" onChange={handleImdbVotes} />
        </div>
        <button onClick={handleAddMovie}>SUBIR PELICULA</button>
      </div>

      <h1>PREVIEW DE LA PELICULA</h1>
      <div className="preview">
        <img
          src={newMovie.poster}
          alt={newMovie.title}
          style={{ width: "12em" }}
        />
        <h1>{newMovie.title}</h1>
        <h3>{newMovie.plot}</h3>
        {newMovie.year > 0 ? <h5>{newMovie.year}</h5> : <></>}
        <h5>{newMovie.director}</h5>
        <div>
          <section>
            {newMovie.genres.map(
              (
                g //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
              ) => (
                <p key={g}>{g}</p>
              )
            )}
          </section>
          <p>{newMovie.imdb.rating}</p>
          <p>{newMovie.imdb.votes}</p>
        </div>
      </div>
    </>
  );
}
