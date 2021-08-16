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

    test.each([
      ['test-role-1', 'test-role-1'],
      ['test-role-2', 'test-role-2'],
      ['test-role-3', 'test-role-3'],
      ['test-role-4', 'test-role-4'],
      ['test-role-5', 'test-role-5']
    ])('POST /roles --> create a role', async (test_name, expected_name) => {
        const res = await request(app)
          .post('/roles')
          .send({
            name: test_name
          })

        expect(res.statusCode).toEqual(200)
        expect(res.body.role_id).toEqual(expect.any(Number))
        expect(res.body.name).toEqual(expected_name)
    })

    test('GET /roles --> get list of all roles', async () => {
      const res = await request(app)
        .get('/roles')

      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toEqual(5)
      expect(res.body).toEqual(expect.arrayContaining([{
          name : expect.any(String),
          role_id : expect.any(Number),
          createdAt : expect.anything(),
          updatedAt : expect.anything()
        }
      ]))
    })
})