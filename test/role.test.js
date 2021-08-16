const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({force: true})
});

afterAll(() => {
  return sequelize.close()
})

describe('ROLE I/O ', () => {
    test('POST /roles --> roleo of user', async () => {
        const res = await request(app)
        .post('/roles')
        .send({
            name: "role no 1"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.category_id).toEqual(expect.any(Number))
    })

    test('GET /roles --> get list of all categories', async () => {
        const res = await request(app)
        .get('/roles')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(expect.arrayContaining([]))
    })

    test('delete /roles --> delete role by id', async () =>{
      const res = await request(app)
      .delete('/roles:pk')
       expect(res.statusCode).toEqual(200)
    })
})