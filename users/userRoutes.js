const router = require('express').Router()
const Users = require('./UserHelpers')
const restricted = require('../auth/middleware')
const db = require('../data/dbConfig')


router.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})


//Gets the user and the experiences they are providing
router.get('/:id/provider', restricted, async (req, res) => {
    const id = req.params.id
    try {
        const user = await Users.findById(id)
        if (user) {
            const experiences = await db('experiences').where({'provider_id': id})
            user.experiences = experiences
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'There is no user with the provided id' })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

//gets the experiences that the user is attending
router.get('/:id/experiences', restricted, async (req, res) => {
    const id = req.params.id
    try {
        const experiences = await Users.findExperiences(id)
        if (experiences.length > 0) {
            return res.status(200).json(experiences)
        } else {
            return res.status(404).json({ message: 'No experience found with this user' })
        }
        
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports = router