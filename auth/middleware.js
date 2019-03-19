const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secrets')

module.exports = (req, res, next) => {
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
        res.status(401).json({ message: "Please Login" })
    }
}