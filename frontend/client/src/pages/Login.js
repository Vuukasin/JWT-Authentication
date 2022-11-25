import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"



const Login = () => {

    const usernameRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [token, setToken] = useState('')




    useEffect(() => {
        usernameRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg('')
    },[username, password])




    const handleSubmit = async (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((result) => {
            if (result.status !== 200) {
                setErrMsg(result.detail)
            }
            setToken(result.accessToken)
        })
    }

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = (
        <section className="login">
            <Link to="/">Home</Link>
            <h1>Login Page</h1>
            <p ref={errRef} style={{ color: 'red' }} >{errMsg}</p>
            <p>{token}</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameRef}
                    value={username}
                    onChange={handleUsernameInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Don't have an account?
                <Link to="/register">Register</Link>
            </p>
        </section>
    )

    return content
}

export default Login