import { Router } from './Router.jsx'
import './App.css'
import AboutPage from './pages/About' 
import HomePage from './pages/Home'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/about',
    component: AboutPage
  }
]
function App() {
  return (
   <main>
     <Router routes={routes}>

     </Router>
   </main>
  )
}

export default App
