import { UserId ,addNewUser,deleteUsersById } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const userUsers = () => {
    const dispatch = useAppDispatch()

    const addUser = ({ name ,email, github}) => {
        dispatch(addNewUser({name,email,github}))
    }

    const handleRemoveUser = (id:UserId) =>{
        dispatch(deleteUsersById(id))
    } 
    return {handleRemoveUser, addUser}
}