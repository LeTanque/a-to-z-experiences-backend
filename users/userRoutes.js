const router = require('express').Router()
const Users = require('./UserHelpers')
const restricted = require('../auth/middleware')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')


router.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id', restricted, async (req, res) => {
    const id = req.params.id
    try {
        const user = await Users.findById(id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json({ message: 'No user with this id exists' })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
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

router.put('/:id', restricted, async (req, res) => {
    const id = req.params.id
    let user = req.body
    if (user.password) {
        const hash = bcrypt.hashSync(user.password, 12)
        user.password = hash
        try {
            const updatedUser = await db('users').update(user).where({ id })
            if (updatedUser > 0) {
                const response = await db('users').where({ id })
                return res.status(200).json(response)
            } else {
                return res.status(404).json({ message: 'No such user with this ID exists' })
            }
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    try {
        const updatedUser = await db('users').update(user).where({ id })
        if (updatedUser > 0) {
            const response = await db('users').where({ id })
            return res.status(200).json(response)
        } else {
            return res.status(404).json({ message: 'No such user with this ID exists' })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router