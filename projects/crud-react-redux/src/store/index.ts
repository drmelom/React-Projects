import {configureStore, type Middleware} from '@reduxjs/toolkit'
import usersReducer from './users/slice'

const persistanceMiddleware : Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
}

const syncWithDatabase:Middleware = (store) => (next) => (action) => {

}

export const store = configureStore({
    reducer:{
        users:usersReducer,
    },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware,syncWithDatabase)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch