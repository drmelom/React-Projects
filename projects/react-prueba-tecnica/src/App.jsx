import './App.css'
import { useCatImage } from "./assets/hooks/useCatImage";


function App() {
  const {fact,catImage,handleClick} = useCatImage()
  return(
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      <section>
      {fact && <p>{fact}</p>}
      {catImage && <img src={catImage} alt={`Image extracted using the first word for ${fact}`}/>}
      </section>
      
    </main>
    
  )
}

export default App
