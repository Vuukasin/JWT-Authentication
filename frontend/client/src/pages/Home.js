import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    const [token, setToken] = useState('')
    const refreshToken = () => {
        fetch("http://localhost:5000/refresh", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((result) => {
                setToken(result.accessToken)
            }
        )
    }

    return (
        <>
            <h1>WELCOME TO HOME PAGE</h1>
            <Link to="/login">SignUp</Link>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <p>Make sure u are logged in</p>
            <button onClick={refreshToken}>Click to refresh token</button>
            <p>{token}</p>
        </>
    )
}

export default Home