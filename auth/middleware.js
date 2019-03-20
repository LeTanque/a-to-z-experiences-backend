//Importing required dependencies
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secrets')

//Middleware for authentication to allow for access to routes
module.exports = (req, res, next) => {
    //looking for token in authorization header in the request
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "Please Login" })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        return res.status(401).json({ message: "Please Login" })
    }
}

