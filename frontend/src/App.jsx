import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [movieDetailed, setMovieDetailed] = useState({});
  return (
    <>
      <header>
        <h1>API Peliculas React</h1>
      </header>
      <Navbar pages={pagesList} setCurrentPage={setCurrentPage} />
      {currentPage === 0 ? <h1>Lista de peliculas</h1> : <></>}
      {currentPage === 1 ? <h1>Crear pelicula</h1> : <></>}
      {currentPage === 2 ? <h1>Detalles pelicula</h1> : <></>}
    </>
  );
}

export default App;
