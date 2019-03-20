const db = require('../data/dbConfig')

module.exports = {
    add,
    findAll,
    findBy,
    findById,
    findExperiences
}

function findAll() {
    return db('users').select('id', 'username', 'password', 'name', 'role', 'about_me', 'email')
}

function findBy(filteredparam) {
    return db('users').where(filteredparam)
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function findById(id) {
    return db('users').where({ id }).first()
}

function findExperiences(id) {
    return db('consumerExperience')
        .join('users', 'consumerExperience.consumer_id', 'users.id')
        .select('users.name')
        .join('experiences', 'consumerExperience.experience_id', 'experiences.id')
        .select('experiences.title', 'experiences.description')
        .where({consumer_id: id})
} 