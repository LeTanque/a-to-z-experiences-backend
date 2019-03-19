require('dotenv').config()
const request = require('supertest')
const server = require('./server')

describe('server', () => {
    it('should set testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe('Get /', () => {
        it('should return status 200 and res.text to be defined', async() => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200)
            expect(res.text).toBeDefined()
        })  
    })
})