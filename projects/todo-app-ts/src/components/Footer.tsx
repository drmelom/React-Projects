import { type FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
    activeCount: number
    onClearComplete: () => void
    completedCount: number
    filterSelected: FilterValue
    handleFilterChange: (filter: FilterValue) => void
}

export function Footer ({activeCount = 0, completedCount , onClearComplete, filterSelected,handleFilterChange}:Props):JSX.Element{  
    console.log(completedCount)
    return(
        <footer className="footer" >
            <span className="todo-count" >
                <strong>{activeCount}</strong> Tareas Pendientes
            </span>

            <Filters
                filterSelected = {filterSelected}
                onFilterChange = {handleFilterChange}
            />
            {
                completedCount > 0 && (
                    <button
                        className="clear-completed"
                        onClick={onClearComplete}
                    >
                        Borrar Completadas
                    </button>
                )
            }

        </footer>
    )
}