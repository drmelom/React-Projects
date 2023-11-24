import { useEffect } from "react"

export default function SearchPage ({routeParams}) {
    useEffect(() => {
        document.title = `Buscaste ${routeParams.query}`    
    }, [routeParams])
    return (
      <>
        <h1>Search</h1>
        <p>Has buscado {routeParams.query}</p>
      </>
    )
}