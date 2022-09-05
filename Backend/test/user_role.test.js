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
const badNewUser1 =
{
    username: 'Edu',
    email: 'edu@gmail.com',
    password: 'edupassword',
    roles: ['user', 'moderator']
}
const badNewUser2 =
{
    username: 'Edus',
    email: 'edu@gmail.com',
    password: 'edupassword',
    roles: ['user']
}
const newAdmin =
{
    username:   'Elena',
    email:      'elena@gmail.com',
    password:   'elenapassword',
    roles:      ['admin', 'user']
}
var accessToken = ''
var accessAdminToken = ''

beforeAll(async () => {
    await User.deleteMany({})
});

describe('Get content (not logged users)', () => {
    test('/api/all', async () => {
        const content = await api.get("/api/all")
        expect(content.status).toEqual(200)
        expect(content.headers['content-type']).toMatch('text/html; charset=utf-8')
    });
    test('/api/user Not token provided', async () => {
        const content = await api.get("/api/user")
        expect(content.status).toEqual(403)
        expect(content.headers['content-type']).toMatch(/application\/json/)
    });
})
describe('Register users', () => {
    test('/api/auth/signup user, wrong role', async () => {
        await api
            .post('/api/auth/signup')
            .send(badNewUser1)
            .expect(400)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signup user succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signup user, username already in use', async () => {
        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(400)
            .expect('content-type', /application\/json/)
    });
        test('/api/auth/signup user, email already in use', async () => {
        await api
            .post('/api/auth/signup')
            .send(badNewUser2)
            .expect(400)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signup admin succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newAdmin)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
})
describe('Log in user account', () => {
    test('/api/auth/signin user not found', async () => {
        await api
            .post('/api/auth/signin')
            .send({
                'username': newUser.username + "ww",
                'password': newUser.password
            })
            .expect(404)
            .expect('content-type', /application\/json/)
    })
    test('/api/auth/signin invalid password', async () => {
        await api
            .post('/api/auth/signin')
            .send({
                'username': newUser.username,
                'password': newUser.password + "ww"
            })
            .expect(401)
            .expect('content-type', /application\/json/)
    })
    test('/api/auth/signin succed', async () => {
        const content = await api
            .post('/api/auth/signin')
            .send({
                'username': newUser.username,
                'password': newUser.password
            })
        expect(content.status).toEqual(200)
        expect(content.headers['content-type']).toMatch(/application\/json/)
        expect(content.body.username).toEqual(newUser.username);
        expect(content.body.email).toEqual(newUser.email);
        accessToken = content.body.accessToken
    })
});

describe('Get content (logged user)', () => {
    test('/api/user granted access token', async () => {
        const content = await api
            .get("/api/user")
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(content.status).toEqual(200)
        expect(content.headers['content-type']).toMatch('text/html; charset=utf-8')
    });
    test('/api/admin require admin.', async () => {
        const content = await api
            .get("/api/admin")
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
        expect(content.status).toEqual(403)
        expect(content.headers['content-type']).toMatch('application/json')
    });
    test('/api/user wrong token', async () => {
        const content = await api
            .get("/api/user")
            .set({ 'x-access-token': accessToken+'sss', Accept: 'application/json' })
        expect(content.status).toEqual(401)
        expect(content.headers['content-type']).toMatch('application/json')
    });
})

describe('Promote and Demote users', () => {
    test('/api/auth/signin succed', async () => {
        const content = await api
            .post('/api/auth/signin')
            .send({
                'username': newAdmin.username,
                'password': newAdmin.password
            })
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch(/application\/json/);
        expect(content.body.username).toEqual(newAdmin.username);
        expect(content.body.email).toEqual(newAdmin.email);
        accessAdminToken = content.body.accessToken
    })
    test('/api/user/promote Promote User to Admin', async () => {
        const content = await api
            .post('/api/user/promote')
            .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
            .send({
                'username': newUser.username,
                'role':     newUser.roles[0]
            })
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch(/application\/json/);
        expect(content.text).toEqual("{\"message\":\"User was promoted successfully!\"}");
    });

    test('/api/user/demote Demote User from Admin', async () => {
        const content = await api
            .post('/api/user/demote')
            .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
            .send({
                'username': newUser.username,
                'role':     'admin'
            })
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch(/application\/json/);
        expect(content.text).toEqual("{\"message\":\"User was demoted from admin successfully!\"}");
    });
});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})