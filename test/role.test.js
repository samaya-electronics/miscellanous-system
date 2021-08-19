const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role } = require('../src/models')

beforeAll(async () => {
  await sequelize.sync({force: true})

  return Role.bulkCreate([
    {name: 'test-role-1'},
    {name: 'test-role-2'},
    {name: 'test-role-3'},
    {name: 'test-role-4'},
    {name: 'test-role-5'},
  ])
});

afterAll(async () => {
  return sequelize.close()
})

describe('Role I/O', () => {

  test('GET /roles --> get list of all roles', async () => {
    const res = await request(app)
      .get('/roles')

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
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ])('GET /roles/:pk --> get role by primary key', async (value, expected) => {
    const res = await request(app)
    .get(`/roles/${value}`)


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.objectContaining({
      name: `test-role-${expected}`,
      role_id: expected
    }))
  })
  
  test.each([
    ['test-role-1'],
    ['test-role-2'],
    ['test-role-3'],
    ['test-role-4'],
    ['test-role-5']
  ])('POST /roles --> create a role', async (test_name) => {
      const res = await request(app)
        .post('/roles')
        .send({
          name: test_name
        })
  
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.role.role_id).toEqual(expect.any(Number))
      expect(res.body.role.name).toEqual(test_name)
  })

  test('PUT /roles --> updates roles by primary key', async() => {
    const res = await request(app)
    .put(`/roles/1`)
    .send({
        name: "test_name"
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.anything())
  })

  test.each([
    [1],
    [2],
    [3],
  ])('DELETE /catagories/:pk --> delete 3 roles', async (test_pk) => {
    const res = await request(app)
    .delete(`/roles/${test_pk}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.role).toEqual(expect.anything())
})
})