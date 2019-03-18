const router = require('express').Router()
const Users = require('./UserHelpers')

router.get('/', async (req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router