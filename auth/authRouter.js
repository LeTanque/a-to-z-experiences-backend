const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/UserHelpers')
const secrets = require('../secrets/secrets')

router.get('/', async (req, res) => {
    return res.status(200).json({ message: "auth router up" })
})

router.post('/register', async (req, res) => {
    let user = req.body
    
    if (!user.username || !user.password || !user.name || !user.email || !user.role) {
        return res.status(400).json({ message: "Please provide all fields" })
    }
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
    try {
        const newUser = await Users.add(user)
        res.status(201).json(newUser)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/login', async (req, res) => {
    let {username, password} = req.body
    if(username && password) {
        try {
            const loggedIn = await Users.findBy({ username }).first()
            if (loggedIn && bcrypt.compareSync(password, loggedIn.password)) {
                const token = generateToken(loggedIn)

                res.status(200).json({
                    message: `Hi ${loggedIn.name}`,
                    token
                })
            } else {
                res.status(401).json({ message: "Bad Credentials" })
            }
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    } else {
        res.status(400).json({ message: "Provide both username and password" })
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        name: user.name,
        role: user.role
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router