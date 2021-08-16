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
    it('POST / --> App is working, returns true', () => {
        return request(app).post('/categories').send({
            name: "cat 1"
        })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => {
            expect(res.body.category_id).toBeDefined()
          })
    })
})