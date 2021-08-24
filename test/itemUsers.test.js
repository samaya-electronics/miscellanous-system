const { arrayContaining } = require('expect');
const request = require('supertest');
const app = require('../src/app');
const { sequelize, Item, Category } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })
});

afterAll(() => {
  return sequelize.close()
})

describe('Item I/O --> Category dependent', () => {

  test('get /userbyrole --> ', async () => {
    const res = await request(app)
      .get('/roles/id/users')
      .send({
        role_id: "1"
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.users).not.toEqual(arrayContaining([{
      name: expect.any(String),
      user_id:  expect.any(Number),
    }]))

  })
})