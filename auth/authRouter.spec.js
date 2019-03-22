require('dotenv').config()
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')

describe('authRouter', () => {
    // afterEach(async () => {
    //     await db('users').truncate()
    // })
    describe('Get /', () => {
        it('should return status 200', async() => {
            const res = await request(server).get('/api/auth')
            expect(res.status).toBe(200)
        })
    })
    describe('Post /register', () => {
        afterEach(async () => {
            await db('users').truncate()
        })
        it('should return status 400', async() => {
            const res = await request(server).post('/api/auth/register').send({username: 'hgfd'})
            expect(res.status).toBe(400)
        })
        it('should return status 201', async() => {
            const res = await request(server).post('/api/auth/register').send({username: 'hgfd', password: 'gfdgf', email: 'hgfdgfd', name: 'ghjghj', role:'admin'})
            expect(res.status).toBe(201)
        })
    })
    describe('Post /login', () => {
        it('should return status 201', async() => {
            const res = await request(server).post('/api/auth/register').send({username: 'hgfd', password: 'gfdgf', email: 'hgfdgfd', name: 'ghjghj', role:'admin'})
            expect(res.status).toBe(201)
        })
        it('should return status 401 bad credentials', async() => {
            const res = await request(server).post('/api/auth/login').send({username:'hgfd', password: 'gfdgggf'})
            expect(res.status).toBe(401)
        })
        it('should return status 200', async() => {
            const res = await request(server).post('/api/auth/login').send({username:'hgfd', password: 'gfdgf'})
            expect(res.status).toBe(200)
        })
    })
})



