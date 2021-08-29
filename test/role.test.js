const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({force: true})

  await Role.bulkCreate([
    {name: 'admin'},
    {name: 'user'},
    {name: 'test-role-3'},
    {name: 'test-role-4'},
    {name: 'test-role-5'},
  ])
  return User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "nourhan",
    role_id: 2
  }])
});

afterAll(async () => {
  return sequelize.close()
})

describe('Role I/O', () => {

  test('GET /roles --> get list of all roles', async () => {
    const res_login = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })

    const res = await request(app)
      .get('/roles')
      .send({
        username: "karim",
        token: res_login.body.token
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.roles.length).toEqual(5)
    expect(res.body.roles).toEqual(expect.arrayContaining([{
      name : expect.any(String),
      role_id : expect.any(Number),
      createdAt : expect.anything(),
      updatedAt : expect.anything()
    }]))
  })

  test.each([
    [1, 'admin'],
    [2, 'user'],
    [3, 'test-role-3'],
    [4, 'test-role-4'],
    [5, 'test-role-5'],
  ])('GET /roles/:pk --> get role by primary key', async (value, expected) => {
    const res_login = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })

    const res = await request(app)
    .get(`/roles/${value}`)
    .send({
      username: "karim",
      token: res_login.body.token
    })


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.objectContaining({
      name: expected,
      role_id: value
    }))
  })
  
  test.each([
    ['test-role-1'],
    ['test-role-2'],
    ['test-role-3'],
    ['test-role-4'],
    ['test-role-5']
  ])('POST /roles --> create a role', async (test_name) => {
      const res_login = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })

      const res = await request(app)
        .post('/roles')
        .send({
          role_name: test_name,
          username: "karim",
          token: res_login.body.token
        })
  
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.role.role_id).toEqual(expect.any(Number))
      expect(res.body.role.name).toEqual(test_name)
  })

  test('PUT /roles --> updates roles by primary key', async() => {
    const res_login = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })
      
    const res = await request(app)
      .put(`/roles/3`)
      .send({
        role_name: "test_name",
        username: "karim",
        token: res_login.body.token
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.anything())
  })

  test.each([
    [3],
    [4],
    [5],
  ])('DELETE /catagories/:pk --> delete 3 roles', async (test_pk) => {
    const res_login = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })

    const res = await request(app)
      .delete(`/roles/${test_pk}`)
      .send({
        username: "karim",
        token: res_login.body.token
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.anything())
  })
})