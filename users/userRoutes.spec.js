require('dotenv').config()
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const jwt = require('jsonwebtoken')


function generateToken() {
    const payload = {
        subject: 1,
        username: 'joe',
        name: 'joe',
        role: 'user',
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, 'whatisthisthisthis', options)
}

const token = generateToken()


describe('userRoutes', () => {
    
    
    describe('Get /', () => {
        // const token = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers = {Authorization: token, Accept:'application/json'}
        it('should return status 200 and an array of users', async() => {
            const res = await request(server).get('/api/users').set(headers)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })
    describe('Get users/:id', () => {
        const headers2 = {Authorization: token, Accept:'application/json'}
        it('should return a single user where you can access the id of the user and expect it to be 1', async() => {
            const res = await request(server).get('/api/users/1').set(headers2)
            expect(res.status).toBe(200)
            console.log(res.body)
            expect(res.body.id).toBe(1)
        })
    })
    describe('Get users/:id/provider', () => {
        const headers3 = {Authorization: token, Accept:'application/json'}
        it('should return a single experience taht the user is providing', async() => {
            const res = await request(server).get('/api/users/1/provider').set(headers3)
            expect(res.status).toBe(200)
            expect(res.body.experiences.length === 1).toBe(true)
            
        })
    })
    describe('Get users/:id/experiences', () => {
        const headers4 = {Authorization: token, Accept:'application/json'}
        it('should return an array of experiences taht the user is attending', async() => {
            const res = await request(server).get('/api/users/1/experiences').set(headers4)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })
})

