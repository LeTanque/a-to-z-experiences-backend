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

describe('ExperienceRouter', () => {
    describe('GET /', () => {
        const headers = {Authorization: token, Accept:'application/json'}
        it('should return an array of experiences', async() => {
            const res = await request(server).get('/api/experiences').set(headers)
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
            expect(res.body.length > 1).toBe(true)
        })
    })
    describe('GET /:id', () => {
        const headers = {Authorization: token, Accept:'application/json'}
        it('should return a single experience with id of 1, and with a 200 status code', async() => {
            const res = await request(server).get('/api/experiences/1').set(headers)
            expect(res.status).toBe(200)
            expect(res.body.id).toBe(1)
        })
    })
    describe('POST /', () => {
        const headers = {Authorization: token, Accept:'application/json'}
        const newExp = {title:'titletest',description:'test',category:'test',street:'test', city:'test', region:'test', postCode:'test',country:'test',provider_id:1}
        it('should return the created experience', async() => {
            const res = await request(server).post('/api/experiences').set(headers).send(newExp)
            expect(res.status).toBe(201)
            expect(res.body.title).toEqual('titletest')
            
        })

    })
})