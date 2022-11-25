const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();
// expected post request to express server /auth
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    const body = JSON.stringify({ username, email, password })
    try {
        const apiRes = await fetch(`${process.env.API_URL}/api/users/register/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body,
        })

        const data = await apiRes.json()

        if (apiRes.status === 201) {
            return res.status(200).json(data)
        } else if (apiRes.status === 400) {
            return res.status(400).json(data)
        }
    } catch(err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

module.exports = router;