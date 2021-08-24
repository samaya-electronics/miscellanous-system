const { arrayContaining } = require('expect');
const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })
  await Role.bulkCreate([
    {name: 'role no1'},
    {name: 'role no2'},
  ])
  return User.bulkCreate([{
    name: "karim",
    user_name: "karim1111",
    role_id: 1
  },{
    name: "nourhan",
    user_name:"nourhan12133",
    role_id: 2
  }])
});

afterAll(() => {
  return sequelize.close()
})

describe('Item I/O --> Category dependent', () => {

  test('get /userbyrole --> ', async () => {
    const res = await request(app)
      .get('/roles/1/users')
      
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.users).toEqual(arrayContaining([{
      name: expect.any(String),
      user_id:  expect.any(Number),
      role_id: expect.any(Number),
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      user_manager_id: null
    }]))

  })

  test('get /userbyrole --> with error', async () => {
    const res = await request(app)
      .get('/roles/marwanbablo/users')
      
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.msg).toEqual(expect.any(String))
    expect(res.body.users).not.toEqual(expect.anything())
  })
})