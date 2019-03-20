//Setting up a router
const router = require('express').Router()
//Importing experience helper functions
const Experience = require('./experienceHelpers')
//Importing authentication middleware
const restricted = require('../auth/middleware')
//Importing configured database
const db = require('../data/dbConfig')

//GET request to return all experiences
router.get('/', restricted, async (req, res) => {
    try {
        const experiences = await Experience.findAll()
        //returning an array of experiences with a success status code
        return res.status(200).json(experiences)
    } catch(error) {
        //error handling
        console.log(error)
        res.status(500).json(error)
    }
})


//GET request at an ID, to return a specific experience
router.get('/:id', restricted, async(req, res) => {
    //Setting an ID variable to the id in the URL
    const id = req.params.id
    try {
        //Finding a specific experience
        const experience = await Experience.findById(id)
        if (experience) {
            //If that experience exists, returns it with a success status code
            return res.status(200).json(experience)
        } else {
            //If no experience, returning a 404 error, saying no experience found with the id
            return res.status(404).json({ message: "No experience with this id exists" })
        }
    } catch(error) {
        //Error handling
        console.log(error)
        res.status(500).json(error)
    }
})


//GET request to find all users signed up for the experience with the id
router.get('/:id/users', restricted, async(req, res) => {
    //Setting an ID variable to the id in the URL
    const id = req.params.id
    try {
        //setting experience to an array of users signed up for the experience at the id
        const experience = await Experience.findConsumers(id)
        if (experience) {
            //If that experience exists, returns it with a success status code
            return res.status(200).json(experience)
        } else {
            return res.status(404).json({ message: "No experience with this id exists" })
        }
    } catch(error) {
        //Error handling
        console.log(error)
        res.status(500).json(error)
    }
})

//POST request to experiences to add an experience
router.post('/', restricted, async (req, res) => {
    const providerId = req.decodedToken.subject
    req.body.provider_id = providerId
    const { title, description, category, street, city, region, postCode, provider_id } = req.body
    //Check to make sure that all required fields are there to prevent sqlite error
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