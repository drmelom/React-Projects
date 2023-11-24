import { Router } from './Router.jsx'
import { lazy, Suspense } from 'react'
import './App.css'
import SearchPage from './pages/Search.jsx'
import { Route } from './Route.jsx'
const HomePage = lazy(() => import('./pages/Home.jsx'))
const AboutPage = lazy(() => import('./pages/About.jsx'))

const routes = [
  {
    path: '/search/:query',
    component: SearchPage
  }
]
function App() {
  return (
   <main>
    <Suspense fallback={null}>
      <Router routes={routes}>
          <Route path='/' component={HomePage}/>
          <Route path='/about' component={AboutPage}/>
      </Router>
    </Suspense>
    
   </main>
  )
}

export default App
