/* eslint-disable react/prop-types */
import "./Navbar.css"

export default function Navbar({ pages, setCurrentPage }) {
  //Creamos un componente que recibirá un array de paginas y una funcion para actualizar el estado la pagina actual
  return (
    <header>
      <h1>API Peliculas React</h1>

      <ul>
        {pages.map((page) => {
          return (
            <p key={page.id}>
              <button onClick={() => setCurrentPage(page.id)}>
                {page.section}
              </button>
              {/* Utilizamos la actualizacion del estado para poder cambiar la pagina
          actual dependiendo de la posicion en la que se encuentre la pagina.
          Con esto, podemos movernos entre los componentes. */}
            </p>
          );
        })}
      </ul>
    </header>
  );
}
