require('dotenv').config()
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const jwt = require('jsonwebtoken')

describe('userRoutes', () => {
    
    
    describe('Get /', () => {
        const token = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers = {Authorization: token, Accept:'application/json'}
        it('should return status 200 and an array of users', async() => {
            const res = await request(server).get('/api/users').set(headers)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })
    describe('Get users/:id', () => {
        const token2 = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers2 = {Authorization: token2, Accept:'application/json'}
        it('should return a single user where you can access the id of the user and expect it to be 1', async() => {
            const res = await request(server).get('/api/users/1').set(headers2)
            expect(res.status).toBe(200)
            console.log(res.body)
            expect(res.body.id).toBe(1)
        })
    })
    describe('Get users/:id/provider', () => {
        const token3 = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers3 = {Authorization: token3, Accept:'application/json'}
        it('should return a single experience taht the user is providing', async() => {
            const res = await request(server).get('/api/users/1/provider').set(headers3)
            expect(res.status).toBe(200)
            expect(res.body.experiences.length === 1).toBe(true)
            
        })
    })
    describe('Get users/:id/experiences', () => {
        const token4 = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers4 = {Authorization: token4, Accept:'application/json'}
        it('should return an array of experiences taht the user is attending', async() => {
            const res = await request(server).get('/api/users/1/experiences').set(headers4)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })
})

