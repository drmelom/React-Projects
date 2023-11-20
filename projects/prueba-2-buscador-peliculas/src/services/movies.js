const API_KEY = '282d4f12'

export const searchMovies = async ({ query }) =>{
    if (query === '') return null

    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const data = await response.json()
        const movies = data.Search
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title, 
            year: movie.Year,
            image: movie.Poster,
        }))
    } catch(error){
        throw new Error('Error searching movies')
    }   
    
}