const router = require('express').Router()
const Experience = require('./experienceHelpers')
const restricted = require('../auth/middleware')

const db = require('../data/dbConfig')


router.get('/', restricted, async (req, res) => {
    try {
        const experiences = await Experience.findAll()
        return res.status(200).json(experiences)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id', restricted, async(req, res) => {
    const id = req.params.id
    try {
        const experience = await Experience.findById(id)
        if (experience) {
            return res.status(200).json(experience)
        } else {
            return res.status(404).json({ message: "No experience with this id exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.get('/:id/users', restricted, async(req, res) => {
    const id = req.params.id
    try {
        const experience = await Experience.findConsumers(id)
        if (experience) {
            return res.status(200).json(experience)
        } else {
            return res.status(404).json({ message: "No experience with this id exists" })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router