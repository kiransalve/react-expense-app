import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../store/AuthReducer'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()    
    const user = useSelector((state) => state.auth.user)
    const IDtoken = useSelector((state) => state.auth.idToken)

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            navigate("/expense")
        }
    }, [navigate])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzY6ra6-FLATrk0g7BI9QGqqxwaucV4e0",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
            const data = await response.json();
            if (data) {
                navigate("/expense")
                dispatch(login(data))
            }
        } catch (error) {
            alert(error.message)
        }
    }
    

    const handleForgetPassword = async () => {
        const email = prompt("Enter your email : ")
        try{
            const response = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAzY6ra6-FLATrk0g7BI9QGqqxwaucV4e0"
            ,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email:email,
                })
            })
            const data = await response.json();
            console.log(data)
            alert("A password reset link has been sent to your email. Please check your inbox.")
        }catch(error){
            console.error(error)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={handleFormSubmit} className='loginForm'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} required
                />

                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} required
                />           
                <input type='submit' value='Login' />
                <button onClick={handleForgetPassword}>Forgot Password</button>
            </form>
        </div>

    )
}

export default Login