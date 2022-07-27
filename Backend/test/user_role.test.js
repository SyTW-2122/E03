const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../server')
const api = supertest(app)

const User = require('../src/models/user.model')

const newUser = 
    {
        username:   'Edu',
        email:      'edu@gmail.com',
        password:   'edupassword',
        roles:      ['user']
    }
const newAdmin =
    {
        username:   'Elena',
        email:      'elena@email.com',
        password:   'elenapassword',
        roles:      ['admin', 'user']
    }

beforeAll(async () => {
    await User.deleteMany({})
});

describe('Get content (not logged users)', () => {
    test('/api/all', async () => {
        const content = await api.get("/api/all")
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch('text/html; charset=utf-8');
    });
    test('/api/user forbidden', async () => {
        const content = await api.get("/api/user")
        expect(content.status).toEqual(403);
        expect(content.headers['content-type']).toMatch(/application\/json/);
    });
})

describe('Register and login users', () => {
    test('/api/auth/signup user succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signup admin succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newAdmin)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signup not found', async () => {
        await api
            .post('/api/auth/signin')
            .send({
                'username': newAdmin.username + "ww",
                'password': newAdmin.password
            })
            .expect(404)
            .expect('content-type', /application\/json/)
    })
    test('/api/auth/signup unauthorized', async () => {
        await api 
            .post('/api/auth/signin')
            .send({
                'username': newAdmin.username,
                'password': newAdmin.password+"ww"
            })
            .expect(401)
            .expect('content-type', /application\/json/)
    })
    test('/api/auth/signup succed', async () => {
        await api
            .post('/api/auth/signin')
            .send({
                'username': newAdmin.username,
                'password': newAdmin.password
            })
            .expect(200)
            .expect('content-type', /application\/json/)
    })
});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})