export const initialState = JSON.parse(localStorage.getItem('cart')) || []

export const updateLocalStorage = state => {
    localStorage.setItem('cart', JSON.stringify(state))

}

export const reducer = (state, action) => {
    const { type: actionType, payload: acionPayload } = action
    
    switch(actionType){
        case 'ADD_TO_CART':{
            const  { id } = acionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            if(productInCartIndex >= 0){
                const newCart = structuredClone(state)
                newCart[productInCartIndex].quantity += 1
                updateLocalStorage(newCart)
                return newCart
            }
            const newCart =[...state, {
                ...action.payload,
                quantity: 1
            
                }
            ]
            updateLocalStorage(newCart)
            return newCart
        }
        case 'REMOVE_FROM_CART':{
           const { id } = acionPayload
           const newCart = state.filter(item => item.id !== id)
           updateLocalStorage(newCart)
           return newCart
            
        }
        case 'CLEAR_CART':{
            updateLocalStorage(initialState)
            return initialState
        }
    }
   return state 
}