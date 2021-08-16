const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({force: true})
});

afterAll(() => {
  return sequelize.close()
})

describe('Category I/O ', () => {
    test('POST /categories --> Creates category', async () => {
        const res = await request(app)
        .post('/categories')
        .send({
            name: "cat 1"
        })

        expect(res.statusCode).toEqual(200)
        expect(res.body.category_id).toEqual(expect.any(Number))
    })

    test('GET /categories --> get list of all categories', async () => {
        const res = await request(app)
        .get('/categories')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expect.arrayContaining([]))
    })
})