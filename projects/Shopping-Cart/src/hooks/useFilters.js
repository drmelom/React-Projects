import {useContext} from 'react'
import {FiltersContext} from '../context/filters.jsx'

export function useFiletrs(){
    const {filters,setFilters} = useContext(FiltersContext)
     
     const filterPropducts = (products => {
       return products.filter(product =>{
         return(
           product.price >= filters.minPrice &&
           (
             filters.category === 'all' ||
             product.category === filters.category
           )
         )
       })
     })
     return {filterPropducts, filters, setFilters}
   }
   