import { type Todo as TodoTypes } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props {
    onAddTodo: ({title}:Pick<TodoTypes,'title'>) => void

}

export function Header ({onAddTodo}:Props) : JSX.Element {
    return (
        <header className="header">
            <h1>todo
                <img style={{width:'60px', height:'auto'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="typescript" />
            </h1>
            <CreateTodo onAddTodo={onAddTodo} />
        </header>
    )
}