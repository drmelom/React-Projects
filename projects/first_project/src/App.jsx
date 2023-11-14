import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        username: 'drmelom',
        name: 'David Rodrigo Melo',
        isFoloowing: true
    },
    {
        username: 'midudev',
        name: 'Miguel Angel Duran',
        isFoloowing: false  
    }
]   

export function App () {

    return (
        <section className='App'>
         {
           users.map(({ username, name, isFollowing }) => (  
                <TwitterFollowCard
                key={username}
                username={username}
                name={name}
                isFoloowing={isFollowing}
                />
            
            ))
         }
        </section>
       
    )
}