import {  type Todo as TodoType } from "../types"

interface Props extends TodoType {
    onRemoveTodo: (id:TodoType['id']) => void 
    onCompleted: ({id, completed}:Pick<TodoType,'id' | 'completed' >) => void  
}

export function Todo ({id, title, completed, onRemoveTodo,onCompleted}:Props):JSX.Element{
    return(
        <div className="view">
            <input 
                className="toggle" 
                type="checkbox" 
                id={id} 
                name={id} 
                checked={completed}
                onChange={(e) => {onCompleted({id, completed: e.target.checked})}}  
            />
            <label htmlFor={id}>{title}</label>
            <button
                className="destroy"
                onClick={() => {onRemoveTodo (id)}}
            ></button>
        </div>
    )

}