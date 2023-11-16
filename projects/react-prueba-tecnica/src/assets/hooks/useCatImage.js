import { useState, useEffect } from 'react'
import { getRamdomFact } from "../services/facts"

export function useCatImage () {
    const  [fact ,setFact] = useState()   
    const [catImage, setCatImage] = useState()
    
    useEffect(()=>{
      getRamdomFact().then(({fact:newFact,ramdomImage:newImage})=>{
      setFact(newFact)
      setCatImage(newImage)
      })
    },[]) 
  
    const handleClick = async () => {
      const {fact,ramdomImage} = await getRamdomFact()
      setFact(fact)
      setCatImage(ramdomImage)
    }
    return {fact,catImage,handleClick}
  }