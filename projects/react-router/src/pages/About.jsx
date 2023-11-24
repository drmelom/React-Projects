import { Link } from '../Link.jsx'

export default function AboutPage () {
    return (
      <>
        <h1>About</h1>
        <div>
          <img src="https://pbs.twimg.com/profile_images/1714963710073016320/QN5hG9fd_400x400.jpg" alt="David" />
          <p>Hola me llamo david y este es un clon de React-Router</p>
        </div>
        
        <Link to ='/'>Ir a sobre nosotros</Link>
      </>
    )
  }