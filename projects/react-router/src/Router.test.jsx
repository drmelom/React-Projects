import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import {describe, expect, it,beforeEach, vi} from 'vitest'
import { Router } from './Router'
import { Route } from './Route' 
import { getCurrentPath } from './utils.js'
import { Link } from './Link.jsx'

vi.mock('./utils.js', () => {
    return {
        getCurrentPath: vi.fn()
    }
})  

describe('Router', () => {
    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()  
    })
    it('should work', () => {
        render(<Router routes={[]}/>)
        expect(true).toBe(true)
    })
    it('should render the default component if no route is found', () => {
        render(<Router routes={[]} defaultComponent={()=> <h1>404</h1>}/>)
        expect(screen.getByText('404')).toBeTruthy()
    })
    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/about')
        const routes = [
            {
                path: '/',
                component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                component: () => <h1>About</h1>
            }
        ]
        render(<Router routes={routes}/>)
        expect(screen.getByText('About')).toBeTruthy()
    })
    it('should navigate using Links', async () => {
        getCurrentPath.mockReturnValueOnce('/')
        render(
            <Router>
                <Route path='/' component={()=>{
                    return (
                        <>
                            <h1>Home</h1>
                            <Link to='/about'>Ir a sobre nosotros</Link>
                        </>
                    )
                }}/>

                <Route path='/about' component={()=>{return <h1>About</h1>}}/>
            </Router>
        )

        const button = screen.getByText(/Go to About/)
        fireEvent.click(button)

        const aboutTitle = await screen.findByText('About')

        expect(aboutTitle).toBeTruthy()
    })
})