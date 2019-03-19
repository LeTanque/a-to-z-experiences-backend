require('dotenv').config()
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

describe('userRoutes', () => {
    
    describe('Get /', () => {
        // afterEach(async () => {
        //     await db('users').truncate()
        // })
        it('should return status 201', async() => {
            const res = await request(server).post('/api/auth/register').send({username: 'hgfd', password: 'gfdgf', email: 'hgfdgfd', name: 'ghjghj', role:'admin'})
            expect(res.status).toBe(201)
        })
        it('should return status 200', async() => {
            const res = await request(server).post('/api/auth/login').send({username:'hgfd', password: 'gfdgf'})
            expect(res.status).toBe(200)
        })
    })
    
})