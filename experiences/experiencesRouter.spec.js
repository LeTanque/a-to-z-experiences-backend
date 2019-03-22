require('dotenv').config()
const request = require('supertest')
const server = require('../api/server')
const db = require('../data/dbConfig')
const jwt = require('jsonwebtoken')

describe('ExperienceRouter', () => {
    describe('GET /', () => {
        const token = jwt.sign('gff', 'whatisthisthisthis', {})
        const headers = {Authorization: token, Accept:'application/json'}
        it('should return an array of experiences', async() => {
            const res = await request(server).get('/api/experiences').set(headers)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length > 1).toBe(true)
        })
        it('should return a single experience with access to the title', async() => {
            const res = await request(server).get('/api/experiences/1').set(headers)
            expect(res.status).toBe(200)
            expect(res.body.title.length > 0).toBe(true)
        })
    })
})