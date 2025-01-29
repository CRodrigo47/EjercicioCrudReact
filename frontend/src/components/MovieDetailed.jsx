export default function Movie({ movie }) { //Recibimos la pelicula que hemos actualizado en la lista de peliculas.
  return (
    <>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "12em" }}
        onClick={() => handleMoviePage(movie)}
      />
      <h1>{movie.title}</h1>
      <h3>{movie.plot}</h3>
      <h5>{movie.year}</h5>
      <h5>{movie.director}</h5>
      <div>
        <section>
          {movie.genres.map((g) => ( //Recorremos el array de generos y dotamos el parrafo con una key unica (En este caso, el nombre del genero.)
            <p key={g}>{g}</p>
          ))}
        </section>
        <p>{movie.imdb.rating}</p>
        <p>{movie.imdb.votes}</p>
      </div>
    </>
  );
}
