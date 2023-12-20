import { useState } from "react"
import { Todo } from "../types"

interface Props {
    onAddTodo: ({title}:Pick<Todo,'title'>) => void
    
}

export function CreateTodo ({onAddTodo}:Props):JSX.Element{
    const [inputValue, setInputValue] = useState('')

    return(
        <input 
            type="text"
            className="new-todo"
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            onKeyDown={(e) => {
                if(e.key === 'Enter'){
                    e.preventDefault()
                    onAddTodo({
                        title: inputValue
                    })
                    setInputValue('')
                }
            }}
            placeholder="What needs to be done?"
            autoFocus
        />
    )
}