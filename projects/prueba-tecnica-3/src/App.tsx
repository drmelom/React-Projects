import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { UsersList } from './components/UsersList'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string|null>(null)
  const originalUsers = useRef<User[]>([])

  const toogleColors = () => {
    setShowColors(!showColors)

  }
  const toogleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDelete = (uuid: string) => {
    const newUsers = users.filter((user)=> user.login.uuid !== uuid)
    setUsers(newUsers)
  }

  const handleResetList = () => {
    setUsers(originalUsers.current)
  }

  const filterUsers = useMemo(()=>filterCountry 
  ? users.filter((user =>{
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })):users, [filterCountry,users] )

  const sortedUsers = useMemo(()=>sortByCountry ? filterUsers.toSorted((a, b) => { 
    return a.location.country.localeCompare(b.location.country)
 }): filterUsers, [sortByCountry, filterUsers]) 


  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(response => response.json())
    .then(data => {
      setUsers(data.results)
      originalUsers.current = data.results
    })
    .catch(error => console.log(error))
  }, [])

  return (
    <div className='app'>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toogleColors}>Colorear filas</button>
        <button onClick={toogleSortByCountry}>{sortByCountry?'No ordenar':'Ordenar por pais'}</button>
        <button onClick={handleResetList}>Resetear lista</button>
        <input type="text" placeholder='Filtra por pais'
          onChange={(event) => {
            setFilterCountry(event.target.value)
            
          }}
        />
      </header>
      <main>
      <UsersList handleDelete={handleDelete} showColors = {showColors} users={sortedUsers}/>
      </main>
    </div>
  )
}

export default App
