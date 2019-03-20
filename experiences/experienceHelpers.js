//importing the configure database
const db = require('../data/dbConfig')

//exporting the created fucntion to experiencesRouter.js
module.exports = {
    add,
    findAll,
    findBy,
    findById,
    findConsumers,
    remove
}

//Used for GET request to get all experiences, and the selected information
function findAll() {
    return db('experiences').select('id', 'title', 'description', 'image', 'category', 'price', 'maxSize', 'street', 'city', 'postCode', 'time_commitment', 'date', 'time', 'provider_id')
}

//A find function to get an experiences by some parameter
function findBy(filteredparam) {
    return db('experiences').where(filteredparam)
}

// A function that allows for the insertion of a new experiences and then returns that experience
async function add(experience) {
    const [id] = await db('experiences').insert(experience)
    return findById(id)
}

//A function to find an experience by its ID
function findById(id) {
    return db('experiences').where({ id }).first()
}

//A function with two join statement that used a third table consumerExperience, to match a many to many request to find all the consumers signed up for an experience
function findConsumers(id) {
    return db('consumerExperience')
        .join('experiences', 'consumerExperience.experience_id', 'experiences.id')
        .select('experiences.title', 'experiences.description')
        .join('users', 'consumerExperience.consumer_id', 'users.id')
        .select('users.name')
        .where({experience_id: id})
} 

//Removes a specified experience
function remove(id) {
    return db('experiences').where({ id }).del()
}