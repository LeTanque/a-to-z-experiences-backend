const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('../auth/authRouter')
const userRouter = require('../users/userRoutes')


const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)

server.get('/', async (req, res) => {
    res.status(200).json({ message: "Server is running" })
})

module.exports = server