const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secrets = require('../secrets/secrets')

router.get('/', async (req, res) => {
    res.status(200).json({ message: "auth router up" })
})

module.exports = router