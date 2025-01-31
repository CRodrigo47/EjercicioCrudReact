import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MoviesList";
import Movie from "./components/MovieDetailed";
import CreateMovie from "./components/CreateMovie";

const pagesList = [
  {
    id: 0,
    section: "Lista de peliculas",
  },
  {
    id: 1,
    section: "Crear peliculas",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState(0); //Con este estado podremos movernos entre paginas. Renderizaremos X componente dependiendo de este.
  const [movie, setMovie] = useState({}); //El estado de la pelicula. Lo utilizaremos en la lista de peliculas para poder actualizarla y mandarla al detalle.
  return (
    <>

      {/* Al navbar le pasamos la lista de "Paginas" a renderizar y el estado para actualizar la pagina actual */}
      <Navbar pages={pagesList} setCurrentPage={setCurrentPage} />
      
      {/* A la lista de peliculas, el estado para actualizar la pagina y para actualizar la pelicula, para que nos pueda mover de pagina actual
       y actualizar la pelicula que elija el usuario. */}
      {currentPage === 0 ? <MovieList setCurrentPage={setCurrentPage} setMovie={setMovie}/> : <></>} 


      {currentPage === 1 ? <CreateMovie/> : <></>}

      {/* A la pelicula le pasamos la propia pelicula. Actualizaremos el estado el componente MovieList. */}
      {currentPage === 2 ? <Movie movie={movie}/> : <></>}
    </>
  );
}

export default App;
