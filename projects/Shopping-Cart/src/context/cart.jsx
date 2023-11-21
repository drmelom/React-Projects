import { useReducer } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

const initialState = []
const reducer = (state, action) => {
    const { type: actionType, payload: acionPayload } = action
    
    switch(actionType){
        case 'ADD_TO_CART':{
            const  { id } = acionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            if(productInCartIndex >= 0){
                const newCart = structuredClone(state)
                newCart[productInCartIndex].quantity += 1
                return newCart
            }
            return [...state, {
                ...action.payload,
                quantity: 1
            
                }
            ]
        }
        case 'REMOVE_FROM_CART':{
            const { id } = acionPayload
           return state.filter(item => item.id !== id)
            
        }
        case 'CLEAR_CART':{
            return initialState
        }
    }
   return state 
}

export function CartProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = products => dispatch({ type: 'ADD_TO_CART', payload: products })
    const removeFromCart = products => dispatch({ type: 'REMOVE_FROM_CART', payload: products })
    const clearCart = () => dispatch({ type: 'CLEAR_CART' })
    return(
        <CartContext.Provider value={{
            cart:state,
            clearCart,
            removeFromCart,
            addToCart
        
        }}>
            {children}
        </CartContext.Provider>
    )
}