const request = require('supertest');
const app = require('../src/app');
const { sequelize, Permission } = require('../src/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })

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
        const res = await request(app)
        .get('/permissions')
  
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
      const res = await request(app)
      .get(`/permissions/${value}`)
  
      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.permission).toEqual(expect.objectContaining({
        name: `test-permission-${expected}`,
        permission_id: expected
      }))
    })
  
    test('PUT /permissions --> updates 3 permission by primary key', async() => {
        const res = await request(app)
        .put('/permissions/1')
        .send({
            name: "test_name"
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
      const res = await request(app)
      .delete(`/permissions/${test_pk}`)
  
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
        const res = await request(app)
        .post('/permissions')
        .send({
            name: test_name
        })
    
        expect(res.statusCode).toEqual(200)
        expect(res.body.err).not.toEqual(expect.anything())
        expect(res.body.permission.permission_id).toEqual(expect.any(Number))
        expect(res.body.permission.name).toEqual(expected_name)
    })
})