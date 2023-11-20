import { useState, useEffect, useRef } from 'react';

export function useSearch({query}){
    const [error,setError] = useState(null)
    const isFirstInput = useRef(true)
  
  
    useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = query === ''
        return
      }
      if (query=== ''){
        setError('Ingrese una busqueda')
        return
      } 
      if (query.match(/^\d+$/)) {
        setError('No se puede buscar una película con un número')
        return
      }
      if (query.length < 3) {
        setError('Ingrese al menos 3 caracteres')
        return
      }
      setError(null)
  
  
    },[query])
    return {error}
  } 