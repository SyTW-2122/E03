const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../server')
const api = supertest(app)

const User = require('../src/models/user.model')
const Film = require('../src/models/film.model');

const newFilm1 =
{
    name: 'Batman',
    desc: 'Película del super heroe murciélago.',
    gender: 'Acción',
    image: 'https://images.justwatch.com/poster/272140348/s592/the-batman.webp'
}
const badFilm1 = 
{
    name: 'Aquaman',
    desc: 'Película del super heroe murciélago.',
    gender: 'Acción',
    image: 'https://images.justwatch.com/poster/272140348/s592/the-batman.webp'
}
const newFilm2 =
{
    name: 'Animales Fantásticos 3  ',
    desc: 'Los Secretos de Dumbledore muestra el mundo fantástico de J. K. Rowling.',
    gender: 'Fantasía',
    image: 'https://images.justwatch.com/poster/270767589/s592/fantastic-beasts-3.webp'
}
const newFilm3 =
{
    name: 'Spider-Man: No Way Home',
    desc: 'Spider-Man, es desenmascarado, y por tanto, ya no es capaz de separar su vida normal de los enormes riesgos que conlleva ser un superhéroe.',
    gender: 'Acción',
    image: 'https://images.justwatch.com/poster/295789644/s592/spider-man-no-hay-camino-a-casa.webp'
}
const newAdmin =
{
    username:   'Elena',
    email:      'elena@gmail.com',
    password:   'elenapassword',
    roles:      ['admin', 'user']
}
const newUser = 
{
    username:   'Mauri',
    email:      'mauri@gmail.com',
    password:   'mauripassword',
    roles:      ['user']
}
var accessToken = ''
var accessAdminToken = '';

beforeAll(async () => {
    await User.deleteMany({});
    await Film.deleteMany({});
});

describe('Upload Films (forbiden user)', () => {
    test('/api/auth/signup user succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newUser)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
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
    test('/api/film/new fail', async () => {
        const content = await api
            .post('/api/film/new')
            .set({ 'x-access-token': accessToken, Accept: 'application/json' })
            .send({
                "name": newFilm1,
                "desc": newFilm1,
                "gender": newFilm1,
                "image": newFilm1
            })
            expect(content.status).toEqual(403);
            expect(content.headers['content-type']).toMatch('application/json; charset=utf-8');
    })
});

describe('Upload Films succes', () => {
    test('/api/auth/signup user succes', async () => {
        await api
            .post('/api/auth/signup')
            .send(newAdmin)
            .expect(200)
            .expect('content-type', /application\/json/)
    });
    test('/api/auth/signin succed', async () => {
        const content = await api
            .post('/api/auth/signin')
            .send({
                'username': newAdmin.username,
                'password': newAdmin.password
            })
        expect(content.status).toEqual(200)
        expect(content.headers['content-type']).toMatch(/application\/json/)
        expect(content.body.username).toEqual(newAdmin.username);
        expect(content.body.email).toEqual(newAdmin.email);
        accessAdminToken = content.body.accessToken
    })
    test('/api/film/new success', async () => {
        await api
        .post('/api/film/new')
        .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
        .send(newFilm1)
        .expect(200)
        .expect('content-type', /application\/json/)
        await api
            .post('/api/film/new')
            .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
            .send(newFilm2)
            .expect(200)
            .expect('content-type', /application\/json/)

        await api
            .post('/api/film/new')
            .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
            .send(newFilm3)
            .expect(200)
            .expect('content-type', /application\/json/)
    
        })
});

describe('Search Film', () => {
    test('/api/film/searchFilm Not found', async () => {
        const content = await api
            .get("/api/film/searchFilm")
            .send({
                "name": badFilm1.name
            })
        expect(content.status).toEqual(404);
        expect(content.headers['content-type']).toMatch(/application\/json/);
    });
    test('/api/film/searchFilm success', async () => {
        const content = await api
            .get("/api/film/searchFilm")
            .send({
                "name": newFilm1.name
            })
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch(/application\/json/);
    });
});

describe('All Films', () => {
    test('/api/film/all', async () => {
        const content = await api
            .get("/api/film/all")
        expect(content.status).toEqual(200);
        expect(content.headers['content-type']).toMatch(/application\/json/);
    });
});

describe('Delete a Film', () => {
    test('/api/film/delete forbidden', async () => {
        const content = await api
            .delete("/api/film/delete")
            .send({
                "name": newFilm1.name
            })
        expect(content.status).toEqual(403);
        expect(content.headers['content-type']).toMatch(/application\/json/);
    });
    // test('/api/film/delete not found', async () => {
    //     const content2 = await api
    //         .delete("/api/film/delete")
    //         .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
    //         .send({
    //             "name": badFilm1.name
    //         })
    //     expect(content2.status).toEqual(404);
    //     expect(content2.headers['content-type']).toMatch(/application\/json/);
    // });
    test('/api/film/delete success', async () => {
        const content3 = await api
            .delete("/api/film/delete")
            .set({ 'x-access-token': accessAdminToken, Accept: 'application/json' })
            .send({
                "name": newFilm1.name
            })
        expect(content3.status).toEqual(200);
        expect(content3.headers['content-type']).toMatch(/application\/json/);
    });
});

afterAll(() => {
    mongoose.connection.close()
    server.close()
})