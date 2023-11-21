import { products as initialProducts } from "./mocks/products"
import { Products } from "./components/Products.jsx"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { useFiletrs } from './hooks/useFilters.js'
import { Cart } from "./components/Cart.jsx"
import { CartProvider } from "./context/cart.jsx"


function App() {


  const { filterPropducts } = useFiletrs()
  
  const filteredProducts = filterPropducts(initialProducts)
  
  

  return(
    <CartProvider>
      <Header/>
      <Cart/>
      <Products products={filteredProducts}/>
      <Footer/>
    </CartProvider>
    
  )
}

export default App
