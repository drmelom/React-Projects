import { useState } from 'react'


 export function TwitterFollowCard ({username, name}) {
    const [isFollowing, setIsFollowing] = useState(false)


    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonclassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'
    const handreClick = () => setIsFollowing(!isFollowing)
    
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                className='tw-followCard-avatar'
                 src={`https://unavatar.io/${username}`} alt="El avatar de David" />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span
                    className='tw-followCard-infoUserName'
                    >@{username}</span>
                </div>
            </header>
            <aside>
                <button className={buttonclassName} onClick={handreClick}>
                <span className='tw-followCard-text'>{text}</span>
                <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
                </button>
                
            </aside>
        </article>
    )
}