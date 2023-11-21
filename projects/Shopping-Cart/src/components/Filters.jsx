
import './Filters.css'
import { useId } from 'react'
import { useFiletrs } from '../hooks/useFilters.js'
export function Filters (){
    const { filters, setFilters } = useFiletrs()
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }
    
    return(
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio</label>
                <input 
                type="range" 
                name="price" 
                id={minPriceFilterId} 
                min='0' 
                max='1000' 
                onChange={handleChangeMinPrice}
                value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select  id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}