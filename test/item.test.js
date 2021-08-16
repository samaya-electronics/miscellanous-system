const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({
    force: true,
  })
});

afterAll(() => {
  return sequelize.close()
})

describe('Item I/O --> Category dependent', () => {

  test.each([
    ['test-cat-1','test-cat-1'],
    ['test-cat-2','test-cat-2'],
    ['test-cat-3','test-cat-3'],
  ])('POST /categories --> create 2 categories for Item testing', async (test_name, expected_name) => {
      const res = await request(app)
      .post('/categories')
      .send({
          name: test_name
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body.category_id).toEqual(expect.any(Number))
      expect(res.body.name).toEqual(expected_name)
  })

  test('POST /items --> Create 1 item, Category dependent', async () => {
    const item_res = await request(app)
      .post('/items')
      .send({
        name: "Item 1 test",
        quantity: 50,
        threshold: 20,
        location: "ta7t el selem",
        category_id: 2
      })
      expect(item_res.statusCode).toEqual(200)
  })

  test('GET /items --> get all items created in DB', async () => {
    const res = await request(app)
      .get('/items')

    expect(res.statusCode).toEqual(200)
  })

  test('GET /items/:pk --> get item by pk to check it is created in DB', async () => {
    const res = await request(app)
      .get('/items/1')

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('Item 1 test')
    expect(res.body.location).toEqual("ta7t el selem")
    expect(res.body.threshold).toEqual(20)
    expect(res.body.quantity).toEqual(50)
    expect(res.body.category_id).toEqual(2)
  })

})