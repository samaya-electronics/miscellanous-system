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
    ['test-item-cat-1','test-item-cat-1'],
    ['test-item-cat-2','test-item-cat-2'],
    ['test-item-cat-3','test-item-cat-3'],
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

  test.each([
    ["test-item-1", "test-loc-1", 58, 30, 1],
    ["test-item-2", "test-loc-2", 52, 25, 2],
    ["test-item-3", "test-loc-3", 55, 20, 2],
  ])('POST /items --> Create 3 item, Category dependent', async (test_name, test_loc, test_q, test_thresh, test_cat_id) => {
    const item_res = await request(app)
      .post('/items')
      .send({
        name: test_name,
        quantity: test_q,
        threshold: test_thresh,
        location: test_loc,
        category_id: test_cat_id
      })
      expect(item_res.statusCode).toEqual(200)
  })

  test('GET /items --> get all items created in DB', async () => {
    const res = await request(app)
      .get('/items')

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(3)
  })

  test('GET /items/:pk --> get item by pk to check it is created in DB', async () => {
    const res = await request(app)
      .get('/items/1')

    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual("test-item-1")
    expect(res.body.location).toEqual("test-loc-1")
    expect(res.body.threshold).toEqual(30)
    expect(res.body.quantity).toEqual(58)
    expect(res.body.category_id).toEqual(1)
  })

})