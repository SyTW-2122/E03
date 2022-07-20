const moongose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../server')
const api = supertest(app)

const User = require('../src/models/user.model')
const Role = require('../src/models/role.model')

const Roles = [
    {
        name:       'user'
    },
    {
        name:       'admin'
    }
]
const Users = [
    {
       username:    'Edu',
       email:       'edu@email.com',
       password:    'edupassword' ,
       role:        'user'
    }
    // {
    //     username:   'Elena',
    //     email:      'elena@email.com',
    //     password:   'elenapassword',
    //     roles: [
    //                 'user'
    //     ]
    // }
]

beforeEach(async () => {
    await User.deleteMany({})
    await Role.deleteMany({})

    for (const role of Roles) {
        const roleObject = new Role(role)
        await roleObject.save()
    }
    for (const user of Users) {
        const userObject = new User(user)
        await userObject.save()
    }
})

describe('Users get', () => {
    test('all', async () => {
        await api
            .get("/api/all")
            .expect(200)
            .expect('Content-Type', /html/)
    })
})