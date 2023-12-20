import { type User } from "../types"

interface Props {
    showColors: boolean
    users: User[]
    handleDelete: (uuid: string) => void

}

export function UsersList ({handleDelete ,showColors ,users}: Props){   
    return(
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index) =>{
                        const color = index % 2 === 0 ? '#333' : '#555' 
                  
                        return(
                            <tr key={user.login.uuid} style={{ backgroundColor: showColors  ? color : 'transparent' }}>
                                <td>
                                    <img src={user.picture.thumbnail} alt={user.name.first}/>
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={()=>{handleDelete(user.login.uuid)}}>Borrar</button>
                                </td>
                            </tr>
                        )    
                    })
                        
                }
            </tbody>
        </table>
    )
}