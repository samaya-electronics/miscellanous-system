const request = require('supertest');
const app = require('../src/app');
const { sequelize, Category, Role, User } = require('../src/database/models')

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
  },{
    name: "shafik",
    role_id: 2
  },{
    name: "youssef",
    role_id: 2
  }])

  return Category.bulkCreate([
    {name: 'test-cat-1'},
    {name: 'test-cat-2'},
    {name: 'test-cat-3'},
    {name: 'test-cat-4'},
    {name: 'test-cat-5'},
  ])
});

afterAll(async () => {
  return sequelize.close()
})

describe('Category I/O ', () => {

  test('GET /categories --> get list of all categories', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim'
    })

    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

      const res = await request(app)
      .get('/categories')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')

      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body).toEqual(expect.objectContaining({
        msg: expect.any(String),
        categories: expect.anything()
      }))
      expect(res.body.categories.length).toEqual(5)
  })

  test.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ])('GET /categories/:pk --> get category by primary key', async (value, expected) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
    .get(`/categories/${value}`)
    .set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'karim')


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.category).toEqual(expect.objectContaining({
      name: `test-cat-${expected}`,
      category_id: expected
    }))
    expect(res.body.msg).toEqual(expect.any(String))
  })

  test('PUT /categories --> updates categories by primary key', async() => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
    .put(`/categories/1`)
    .set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'karim')
    .send({
      category_name: "test_name",
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.category).toEqual(expect.anything())
  })

  test.each([
    {test_pk: 1, remaining_objects_num: 4},
    {test_pk: 2, remaining_objects_num: 3},
    {test_pk: 3, remaining_objects_num: 2},
  ])('DELETE /catagories/:pk --> delete 3 categories', async ({test_pk, remaining_objects_num}) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
    .delete(`/categories/${test_pk}`)
    .set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'karim')

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.category).toEqual(expect.anything())
  })

  test.each([
    ['test-cat-1','test-cat-1'],
    ['test-cat-2','test-cat-2'],
    ['test-cat-3','test-cat-3'],
    ['test-cat-4','test-cat-4'],
    ['test-cat-5','test-cat-5'],
  ])('POST /categories --> Creates 5 categories', async (test_name, expected_name) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .post('/categories')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')
      .send({
        category_name: test_name,
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.category.category_id).toEqual(expect.any(Number))
    expect(res.body.category.name).toEqual(expected_name)
  })

  test('POST /categories --> testing category creation error', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .post('/categories')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.msg).toEqual(expect.any(String))
  })

})