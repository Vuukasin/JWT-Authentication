import { useState } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


const Register = () => {


    const usernameRef = useRef()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [usernameErrMsg, setUsernameErrMsg] = useState('')
    const [emailErrMsg, setEmailErrMsg] = useState('')
    const [passwordErrMsg, setPasswordErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('') 

    const handleUsernameInput = (e) => setUsername(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((result) => {
            setUsernameErrMsg(result.username)
            setEmailErrMsg(result.email)
            setPasswordErrMsg(result.password)
            setSuccessMsg(result.message)
        })
    }

    const content = (
        <section className="register">
            <Link to="/">Home</Link>
            <h3 style={{ color: 'green' }}>{successMsg}</h3>
            <h1>Register Page</h1>
            
            <form onSubmit={handleSubmit}>
                <p>{usernameErrMsg}</p>
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
                <p style={{ color: 'red' }}>{emailErrMsg}</p>
                <label htmlFor="username">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailInput}
                    autoComplete="off"
                    required
                />
                <p style={{ color: 'red' }}>{passwordErrMsg}</p>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordInput}
                    required
                />
                <br />
                <br />
                <button>Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </section>
    )

    return content
}

export default Register

