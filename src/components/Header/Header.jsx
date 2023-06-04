import React from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/AuthReducer'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = localStorage.getItem("idToken")

    return (
        <div>
            <header>
                <Link to="/" className="logo">Expense Tracker</Link>
                <nav>
                    <ul>
                        {loggedInUser ? <li><Link to="/expense">Expense</Link></li> : <li><Link to="/">Home</Link></li>}

                        {!loggedInUser ? (<li><Link to="/signup">Signup</Link></li>) :
                            (<li><button className='logout' onClick={() => {
                                dispatch(logout())
                                navigate("/signup")
                            }}>logout</button></li>)}

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header