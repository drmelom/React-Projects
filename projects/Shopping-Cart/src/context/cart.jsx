import { useReducer } from "react";
import { createContext} from "react";
import { reducer , initialState} from "../reducers/cart.js";
export const CartContext = createContext();

function useCartReducer() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = products => dispatch({ type: 'ADD_TO_CART', payload: products })
    const removeFromCart = products => dispatch({ type: 'REMOVE_FROM_CART', payload: products })
    const clearCart = () => dispatch({ type: 'CLEAR_CART' })
    return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider({children}){
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()
   
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