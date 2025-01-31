/* eslint-disable react/prop-types */
import "./MovieCard.css"

export default function MovieCard({ movie, handleMovieChange }) {
  return (
    <div className="movie-card" onClick={() => handleMovieChange(movie)}>
      <div className="movie-card-poster">
        <img src={movie.poster} alt={movie.title} />
      </div>
      <div className="movie-card-datos">
        <p>{movie.title}</p>
        <p className="movie-card-year">{movie.year}</p>
      </div>
    </div>
  );
}
