import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

const DEFAULT_STATE = [
    {
        id: "1",  
        name: "Peter Doe",
        email: "peterdoe@corre.com",
        github: "peterdoe",
      },
      {
        id: "2",
        name: "Lena Whitehouse",
        email: "lena@correo.com",
        github: "drmelom",
      
      },
      {
        id: "3",
        name: "Phil Less",
        email: "phil@correo.com",
        github: "philless",
      },
]

export type UserId = string

export interface User {
    name: string
    email: string
    github: string
}

export interface UserWithId extends User {
    id:UserId
}

const initialState: UserWithId[] = (() => {
    const persistaedStage = localStorage.getItem('reduxState')
    return persistaedStage ? JSON.parse(persistaedStage).users : DEFAULT_STATE
})()



export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser : (state,action : PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, {...action.payload, id}]
        },
        deleteUsersById: (state,action : PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id)
        }
        
    },
})

export default usersSlice.reducer

export const {deleteUsersById,addNewUser} = usersSlice.actions
