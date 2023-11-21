import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import PropTypes from 'prop-types'
import { useCart } from '../hooks/useCart'

export function Products ({ products }){
    const {addToCart, cart, removeFromCart } = useCart()
    const checkProductInCart = product => 
    cart.some(item => item.id === product.id)
    return (
        <main className='products'>
            <ul>
                {products.map(product => {
                    const isProductInCart = checkProductInCart(product) 
                    return(
                    <li key={product.id}>
                        <img 
                        src={product.thumbnail} 
                        alt={product.title} />
                        <div>
                            <strong>{product.title}</strong> -$ {product.price}
                        </div>
                        <div>
                            <button style={{backgroundColor: isProductInCart ? 'red' : '#09f'}} 
                            onClick={()=> isProductInCart? removeFromCart(product)
                                                : addToCart(product)}>
                                {
                                    isProductInCart ? <RemoveFromCartIcon/>: <AddToCartIcon/> 
                                
                                }
                            </button>
                        </div>
                    </li>
                    )
                })}

            </ul>
        </main>
    )
}

Products.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            thumbnail: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
}