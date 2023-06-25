import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import "./Signup.css"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const navigate = useNavigate()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password);
        if (password.length > 5 && password === cpassword) {
            try {
                const response = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCoKzZHD2w9DdTvYtOvlQQNF1M8-LCKjA", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        email: email, password: password, cpassword: cpassword
                    })
                })
                const data = await response.json()
                console.log(data)
                navigate("/login")
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Invalid Password")
        }

    }
    return (
        <div className='signup'>
            <form onSubmit={handleFormSubmit} className='signupForm'>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <label htmlFor="c_password">Confirm Password:</label>
                <input
                    type="password"
                    id="c_password"
                    value={cpassword}
                    onChange={(event) => setCPassword(event.target.value)}
                />

                <input type="submit" value="Signup" />
                <p>Have account already, <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Signup