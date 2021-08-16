const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({force: true})
});

afterAll(() => {
  return sequelize.close()
})

describe('Role I/O', () => {
    test('POST /roles --> create a role', async () => {
        const res = await request(app)
        .post('/roles')
        .send({
            name: "role no 1"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body.role_id).toEqual(expect.any(Number))
    })
})