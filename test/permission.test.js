const request = require('supertest');
const app = require('../src/app');
const { sequelize, Permission, Role, User } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })

  await Role.bulkCreate([
    {name: 'admin'},
    {name: 'admin'},
  ])
  await User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "nourhan",
    role_id: 2
  }])

  return Permission.bulkCreate([
      {name: "test-permission-1"},
      {name: "test-permission-2"},
      {name: "test-permission-3"},
      {name: "test-permission-4"},
      {name: "test-permission-5"}
  ])
});

afterAll(() => {
  return sequelize.close()
})

describe('Permission I/O', () => {
    test('GET /permissions --> get list of all Permissions', async () => {
      const resAuth = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })
      const res = await request(app)
        .get('/permissions')
        .set('authorization', `Bearer ${resAuth.body.token}`)
        .set('username', 'karim')
        
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permissions).toEqual(expect.arrayContaining([{
        permission_id: expect.any(Number),
        name: expect.any(String),
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      }]))
      expect(res.body.permissions.length).toEqual(5)
    })
  
    test.each([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
    ])('GET /permissions/:pk --> get Permission by primary key', async (value, expected) => {
      const resAuth = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })
        
      const res = await request(app)
      .get(`/permissions/${value}`)
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')
  
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permission).toEqual(expect.objectContaining({
        name: `test-permission-${expected}`,
        permission_id: expected
      }))
    })
  
    test('PUT /permissions --> updates 3 permission by primary key', async() => {
      const resAuth = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })

      const res = await request(app)
        .put('/permissions/1')
        .set('authorization', `Bearer ${resAuth.body.token}`)
        .set('username', 'karim')
        .send({
          name: "test_name",
        })

      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permission).toEqual(expect.anything())
    })
  
    test.each([
      {test_pk: 1, remaining_objects_num: 4},
      {test_pk: 2, remaining_objects_num: 3},
      {test_pk: 3, remaining_objects_num: 2},
    ])('DELETE /permissions/:pk --> delete 3 permissions', async ({test_pk, remaining_objects_num}) => {
      const resAuth = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })

      const res = await request(app)
        .delete(`/permissions/${test_pk}`)
        .set('authorization', `Bearer ${resAuth.body.token}`)
        .set('username', 'karim')
  
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permission).toEqual(expect.anything())
    })
  
    test.each([
      ['test-permission-post-1','test-permission-post-1'],
      ['test-permission-post-2','test-permission-post-2'],
      ['test-permission-post-3','test-permission-post-3'],
      ['test-permission-post-4','test-permission-post-4'],
      ['test-permission-post-5','test-permission-post-5'],
    ])('POST /permission --> Creates 5 permissions', async (test_name, expected_name) => {
      const resAuth = await request(app)
        .post('/auth/login')
        .send({
          username: "karim"
        })

      const res = await request(app)
        .post('/permissions')
        .set('authorization', `Bearer ${resAuth.body.token}`)
        .set('username', 'karim')
        .send({
            name: test_name,
        })
    
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permission.permission_id).toEqual(expect.any(Number))
      expect(res.body.permission.name).toEqual(expected_name)
    })
})