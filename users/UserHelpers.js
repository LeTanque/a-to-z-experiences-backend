const db = require('../data/dbConfig')

module.exports = {
    add,
    findAll,
    findBy,
    findById
}

function findAll() {
    return db('users').select('id', 'username', 'password', 'name', 'role', 'email')
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