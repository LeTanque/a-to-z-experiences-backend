//Brings in required dependencies to create a routed API, and protection for it with helmet
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

//Importing the seperate routes
const authRouter = require('../auth/authRouter')
const userRouter = require('../users/userRoutes')
const experienceRouter = require('../experiences/experiencesRouter')

//Setting up the server with express
const server = express()

//Having the server use the dependenices
server.use(helmet())
server.use(cors())
server.use(express.json())

//Having the server use the routes and setting up where they are located
server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.use('/api/experiences', experienceRouter)

//Simple route just to make sure the server is running
server.get('/', async (req, res) => {
    res.status(200).json({ message: "Server is running" })
})

//Exporting the server to be used in index.js
module.exports = server