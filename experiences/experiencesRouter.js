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

router.post('/', restricted, async (req, res) => {
    const { title, description, category, street, city, region, postCode, provider_id } = req.body
    if (!title || !description || !category || !street || !city || !region || !postCode || !provider_id) {
        return res.status(400).json({ message: "Please fill all fields" })
    }
    try {
        const experience = await Experience.add(req.body)
        return res.status(201).json(experience)
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.put('/:id', restricted, async (req, res) => {
    const id = req.params.id
    try {
        const updatedExperience = await db('experiences').update(req.body).where({ id })
        if (updatedExperience > 0) {
            const response = await db('experiences').where({ id })
            return res.status(200).json(response)
        } else {
            return res.status(404).json({ message: 'No such experience with this ID exists' })
        }
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.delete('/:id', restricted, async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await Experience.remove(id)
        if (deleted > 0) {
            return res.status(204).json({ message: 'Experience was deleted' })
        } else {
            return res.status(404).json({ message: 'No such experience exists witht this id' })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports = router