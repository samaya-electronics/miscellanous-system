const request = require('supertest');
const app = require('../src/app');
const { sequelize, Category } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({
    force: true,
  })
});

afterAll(async () => {
  await sequelize.sync({
    force: true,
  })

  return sequelize.close()
})

describe('Category Output ', () => {

  beforeEach(() => {
    return Category.bulkCreate([
      {name: 'test-cat-1'},
      {name: 'test-cat-2'},
      {name: 'test-cat-3'},
      {name: 'test-cat-4'},
      {name: 'test-cat-5'},
    ])
  })

  afterEach(() => {
    return sequelize.sync({
      force: true,
    })
  })

  test('GET /categories --> get list of all categories', async () => {
      const res = await request(app)
      .get('/categories')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.arrayContaining([{
        category_id: expect.any(Number),
        name: expect.any(String),
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      }]))
      expect(res.body.length).toEqual(5)
  })

  test.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ])('GET /categories/:pk --> get category by primary key', async (value, expected) => {
    const res = await request(app)
    .get(`/categories/${value}`)


    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      name: `test-cat-${expected}`,
      category_id: expected
    }))
  })

  test('PUT /categories --> updates 3 categories by primary key', async() => {
      const res = await request(app)
      .put(`/categories/1`)
      .send({
          name: "test_name"
      })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.arrayContaining([1]))
  })

  test.each([
    {test_pk: 1, remaining_objects_num: 4},
    {test_pk: 2, remaining_objects_num: 4},
    {test_pk: 3, remaining_objects_num: 4},
  ])('DELETE /catagories/:pk --> delete 3 categories', async ({test_pk, remaining_objects_num}) => {
    const delete_res = await request(app)
    .delete(`/categories/${test_pk}`)

    const read_res = await request(app)
    .get(`/categories`)

    expect(delete_res.statusCode).toEqual(200)

    expect(read_res.statusCode).toEqual(200)
    expect(read_res.body.length).toEqual(remaining_objects_num)
  })
})

describe('Category Input POST', () => {
  test.each([
    ['test-cat-1','test-cat-1'],
    ['test-cat-2','test-cat-2'],
    ['test-cat-3','test-cat-3'],
    ['test-cat-4','test-cat-4'],
    ['test-cat-5','test-cat-5'],
  ])('POST /categories --> Creates 5 categories', async (test_name, expected_name) => {
      const res = await request(app)
      .post('/categories')
      .send({
          name: test_name
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body.category_id).toEqual(expect.any(Number))
      expect(res.body.name).toEqual(expected_name)
  })
})