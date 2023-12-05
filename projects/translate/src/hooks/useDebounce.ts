import { useEffect, useState } from "react";


export function useDebounce<T> (value:T, delay = 500) {
   const [debousedValue, setDebouseValue]= useState(value)

   useEffect(() => {
        const timer = setTimeout(() => {
            setDebouseValue(value)
        }, delay)

        return () => {clearTimeout(timer)}
   }, [value,delay])

   return debousedValue
}