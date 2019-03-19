const db = require('../data/dbConfig')

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    findConsumers,
    remove
}

function findAll() {
    return db('experiences').select('id', 'title', 'description', 'image', 'category', 'price', 'maxSize', 'street', 'city', 'postCode', 'provider_id')
}

function findBy(filteredparam) {
    return db('experiences').where(filteredparam)
}

async function add(experience) {
    const [id] = await db('experiences').insert(experience)
    return findById(id)
}

function findById(id) {
    return db('experiences').where({ id }).first()
}

function findConsumers(id) {
    return db('consumerExperience')
        .join('experiences', 'consumerExperience.experience_id', 'experiences.id')
        .select('experiences.title', 'experiences.description')
        .join('users', 'consumerExperience.consumer_id', 'users.id')
        .select('users.name')
        .where({experience_id: id})
} 

function remove(id) {
    return db('experiences').where({ id }).del()
}