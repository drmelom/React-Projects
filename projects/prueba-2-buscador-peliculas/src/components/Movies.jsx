

export function Movies({movies}){
    return(
        movies? (
            <ul className="movies">
          {
            movies.map(movie => (
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.image} alt={movie.Title} />
              </li>
            ))
          }
        </ul>
        )
        : (
            <p>No se encontraron peliculas para esta busqueda</p>
        )   
      )
}
