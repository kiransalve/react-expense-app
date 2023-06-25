import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <div className='home-title'>Welcome to my Expense Tracker App!</div>
            <p>Here you can track your expenses.</p>
            <button className='home-button'><Link to="/signup">Signup Here</Link></button>
        </div>

    )
}

export default Home