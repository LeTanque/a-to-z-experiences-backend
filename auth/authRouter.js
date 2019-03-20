//Importing the required dependencies
const router = require('express').Router() //Configuring express to work with routes
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Importing the helper function as Users
const Users = require('../users/UserHelpers')

//importing secrets for use in token generation
const secrets = require('../secrets/secrets')

//Simple route to make sure the route is running
router.get('/', async (req, res) => {
    return res.status(200).json({ message: "auth router up" })
})

//POST request to allow for the registration of a new user
router.post('/register', async (req, res) => {
    //Setting up user to be equal to req.body
    let user = req.body
    
    //Check to make sure the required fields are filled in to prevent a sqlite error due to null constraints
    if (!user.username || !user.password || !user.name || !user.email || !user.role) {
        return res.status(400).json({ message: "Please provide all fields" })
    }
    //Hashing the password for protection adn security
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash
    try {
        //Adding the new user to the database
        const newUser = await Users.add(user)
        //Returning a succesful status code with the new user
        return res.status(201).json(newUser)
    } catch(error) {
        //Console logging any errors
        console.log(error)
        //Returning a error status code due to an internal server error
        return res.status(500).json(error)
    }
})

//POST request to login to generate a token that can be set in headers
router.post('/login', async (req, res) => {
    //checking to make sure that a username and password are given
    let {username, password} = req.body
    if(username && password) {
        try {
            //Finding the user in the database who matches the username provided
            const loggedIn = await Users.findBy({ username }).first()
            //checking to make sure that the username is valid and that the given password matches the password in the database
            if (loggedIn && bcrypt.compareSync(password, loggedIn.password)) {
                //generates a token for authentication
                const token = generateToken(loggedIn)
                //Returning a succesfull status code with a short welcome message and the token
                return res.status(200).json({
                    message: `Hi ${loggedIn.name}`,
                    token,
                    id: loggedIn.id
                })
            } else {
                //If no matches for username or password, returns a message saying the credentials were incorrect
                res.status(401).json({ message: "Bad Credentials" })
            }
            //Catching any internal server errors
        } catch(error) {
            //console logging errors
            console.log(error)
            //returning error status code
            res.status(500).json(error)
        }
    } else {
        //If a username or password isnt provided, sends back a message asking for both to be provided
        return res.status(400).json({ message: "Provide both username and password" })
    }
})

//Token generation function
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

//Exporting the router to server.js
module.exports = router