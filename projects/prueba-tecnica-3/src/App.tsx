import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { useQueryClient} from '@tanstack/react-query'
import { useUsers } from './hook/useUsers'


function App() {
  const queryClient = useQueryClient();
  const {fetchNextPage,hasNextPage,isError,isLoading,refetch,users} = useUsers()
 
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState<string|null>(null)

  const toogleColors = () => {
    setShowColors(!showColors)

  }
  const toogleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDelete = (uuid: string) => {

    queryClient.setQueryData(['users'],(prevState:typeof users)=>{
      console.log('Estado Pevio',prevState);
      const filteredPages = prevState?.pages.map((page) => {
        const filteredUsers = page.users.filter((user) => user.login.uuid !== uuid);
    
        return {
          users: filteredUsers,
          nextCursor: page.nextCursor,
        };
      });

      return {  
        pages: filteredPages,
        pageParams: prevState?.pageParams,
      
    }})
  }

  const handleResetList = () => {
    refetch()
  }

  const filterUsers = useMemo(()=>filterCountry
  ? users.filter((user =>{
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })):users, [filterCountry,users] )

  const sortedUsers = useMemo(()=>sortByCountry ? filterUsers.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country)
 }): filterUsers, [sortByCountry, filterUsers])




  return (
    <div className='app'>
      <h1>Prueba Tecnica</h1>
      <header style={{display:'flex', gap:'25px', marginBottom:'15px'}}>
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
        {users.length > 0 && <UsersList handleDelete={handleDelete} showColors = {showColors} users={sortedUsers}/>}
        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error</p>}
        { !isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && <button onClick={()=> fetchNextPage()}>Cargar mas resultados</button>}      
      </main>
    </div>
  )
}

export default App
