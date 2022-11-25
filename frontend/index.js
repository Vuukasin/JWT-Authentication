const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

const loginRoute = require('./routes/auth/login')
const registerRoute = require('./routes/auth/register')
const refreshTokenRoute = require('./routes/auth/refreshToken')

app.use(loginRoute)
app.use(registerRoute)
app.use(refreshTokenRoute)


app.use(express.static('client/build'))
app.use("*", (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})

console.log(process.env.PORT)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))