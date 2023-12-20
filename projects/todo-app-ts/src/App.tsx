import { useState } from "react"
import { Todos } from "./components/Todos"
import { FilterValue, type Todo } from "./types"
import { TODO_FILTERS } from "./const"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos = [
  {
    completed: false,
    id: 'c19f8c9b-ae32-4c8a-9bed-d141b09f5477',
    title: 'Sacar al miduperro a pasear'
  },
  {
    completed: true,
    id: 'efad0afc-7d2e-4020-8ef4-14fd0b832de8',
    title: 'Ir a por el pan'
  },
  {
    completed: false,
    id: '6a3d0d0f-d2d6-4d2a-9b08-5a5d8a5e0c1d',
    title: 'Participar en la Hackathon de Cloudinary'
  }
]


function App():JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filter, setFilter] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = (id:Todo['id'])  => {
    const newtodos = todos.filter((todo) => todo.id !== id)
    setTodos(newtodos)
  }

  const handleCompleted = ({id,completed}:Pick<Todo,'id'| 'completed'>) => {
    const newtodos = todos.map(todo => {
      if(todo.id === id){
        return {...todo, completed}
      }
      return todo
    })
    setTodos(newtodos)

  }

  const handleFilterChange = (filter: FilterValue) => {
    console.log(filter)
    setFilter(filter)
  }
  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount =  todos.length -activeCount
  const filteredTodos = todos.filter((todo) => {
    if(filter === TODO_FILTERS.ACTIVE){
      return !todo.completed
    }
    if(filter === TODO_FILTERS.COMPLETED){
      return todo.completed
    }
    return true
  })
  const handleRemoveAllCompleted = () => {
    const newtodos = todos.filter((todo) => !todo.completed)
    setTodos(newtodos)
  }

  const handleAddTodo = ({title}:Pick<Todo,'title'>) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  return (
    <div className="todoapp">
      <Header
        onAddTodo={handleAddTodo}
      />
      <Todos 
        onCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos} 
      
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filter}
        handleFilterChange={handleFilterChange}
        onClearComplete={handleRemoveAllCompleted}
      />
    </div>
  )
}

export default App
