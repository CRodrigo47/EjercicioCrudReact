class Movie { //Creamos una clase movie con los atributos para mandarle informacion a la API.
    //Ademas, le damos unos valores por defectos para poder desestructurar la clase cuando creemos un nuevo objeto vacio a partir de ella.
    constructor(
      imdb = { rating: 0, votes: 0 },
       _id = "",
      title = "",
      year = null,
      director = "",
      plot = "",
      genres = [],
      poster = ""
    ) {
      this.imdb = imdb;
      this._id = _id;
      this.title = title;
      this.year = year;
      this.director = director;
      this.plot = plot;
      this.genres = genres;
      this.poster = poster;
    }
  }
  
  export default Movie;