import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to my Expense Tracker App!</h1>
            <p>Here you can track your expenses.</p>
            <button className='home-button'><Link to="/signup">Signup Here</Link></button>
        </div>

    )
}

export default Home