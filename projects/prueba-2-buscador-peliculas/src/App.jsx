import { useMovies } from './hooks/useMovies'
import { useState ,useCallback} from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'


function App() {
  const [sort, setSort] = useState(false)
  const [query,setQuery] = useState('')
  const {error} = useSearch({query})
  const { movies ,getMovies , loading} = useMovies({query, sort})
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({query:search})
    }, 500),[getMovies]
  )
  

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ query})
  }

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(' ')) return;
    setQuery(event.target.value)
    debouncedGetMovies(newQuery)

  }

  const handleSort = () =>{
    setSort(!sort)
  }
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form  className='form' onSubmit={handleSubmit}>
          <input value={query} style={{border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
              }} onChange={handleChange} placeholder='Avengers, Star Wars, The Matrix ...' />
          <input type="checkbox" onChange={handleSort} checked = {sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color:'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
        
      </main>
     
    </div>
  )
}

export default App
