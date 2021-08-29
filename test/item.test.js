const request = require('supertest');
const app = require('../src/app');
const { sequelize, Item, Category, Role, User } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })

  await Category.bulkCreate([
    {name: 'test-cat-1'},
    {name: 'test-cat-2'},
    {name: 'test-cat-3'}
  ])

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

  return Item.bulkCreate([
    {
      name: "test-item-1",
      quantity: 50,
      threshold: 30,
      location: "test-loc-1",
      category_id: 1,
      code: "125626werfs"
    },
    {
      name: "test-item-2",
      quantity: 50,
      threshold: 30,
      location: "test-loc-2",
      category_id: 2,
      code :"12566werfs"
    },
    {
      name: "test-item-3",
      quantity: 50,
      threshold: 30,
      location: "test-loc-3",
      category_id: 1,
      code :"125686werfs"
    },
  ])

});

afterAll(() => {
  return sequelize.close()
})

describe('Item I/O --> Category dependent', () => {

  test('GET /items --> get all items created in DB', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .get('/items')
      .send({
        token: resAuth.body.token,
        username: 'karim'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.items.length).toEqual(3)
  })
  
  test('GET /items/:pk --> get item by pk to check it is created in DB', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
    .get('/items/1')
    .send({
      token: resAuth.body.token,
      username: 'karim'
    })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.item.name).toEqual("test-item-1")
    expect(res.body.item.location).toEqual("test-loc-1")
    expect(res.body.item.threshold).toEqual(30)
    expect(res.body.item.quantity).toEqual(50)
    expect(res.body.item.category_id).toEqual(1)
  })
  
  test.each([
    ["test-item-1", "test-loc-1", 58, 30, 1,"125626werfs"],
    ["test-item-2", "test-loc-2", 52, 25, 2,"12566werfs"],
    ["test-item-3", "test-loc-3", 55, 20, 2,"125686werfs"],
  ])('POST /items --> Create 3 item, Category dependent', async (test_name, test_loc, test_q, test_thresh, test_cat_id,test_code) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .post('/items')
      .send({
        item_name: test_name,
        quantity: test_q,
        threshold: test_thresh,
        location: test_loc,
        category_id: test_cat_id,
        code: test_code,
        leader_approve: true,
        users_ids: [4,2,3],
        order: [1,2,3],
        leader_approve: true,
        token: resAuth.body.token,
        username: 'karim'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.item).toEqual(expect.objectContaining({
      name: test_name,
      quantity: test_q,
      threshold: test_thresh,
      location: test_loc,
      category_id: test_cat_id,
      code: test_code,
    }))
  })

  test('POST /items --> error in creating Item', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .post('/items')
      .send({
        nme: "test-item-1", // wrong name tag
        quantity: 50,
        threshold: 30,
        location: "test-loc-1",
        category_id: 1,
        code: "125626werfs",
        users_ids: [4,2,3],
        order: [1,2,3],
        leader_approve: true,
        token: resAuth.body.token,
        username:'karim'
      })

    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.item).not.toEqual(expect.anything())
  })

  test.each([
    ["test-item-1-edit", "test-loc-1", 58, 30, 1, 1, "dkj123hj"],
    ["test-item-2-edit", "test-loc-2", 52, 25, 2, 2, "dkj123hj"],
    ["test-item-3-edit", "test-loc-3", 55, 20, 2, 3, "dkj123hj"],
  ])('PUT /items --> Edit 3 items', async (test_name, test_loc, test_q, test_thresh, test_cat_id, item_to_change_id, item_to_change_code) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())

    const res = await request(app)
      .put(`/items/${item_to_change_id}`)
      .send({
        item_name: test_name,
        quantity: test_q,
        threshold: test_thresh,
        location: test_loc,
        category_id: test_cat_id,
        code: item_to_change_code,
        users_ids: [4,2,3],
        order: [1,2,3],
        leader_approve: false,
        token: resAuth.body.token,
        username: 'karim'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.item).toEqual(expect.objectContaining({
      name: test_name,
      quantity: test_q,
      threshold: test_thresh,
      location: test_loc,
      category_id: test_cat_id
    }))
  })

  test('DELETE /items/:pk --> delete item by pk', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'karim',
      password:'password'})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
    
    const res = await request(app)
    .delete('/items/1')
    .send({
      token:resAuth.body.token,
      username:'karim'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.item.name).toEqual(expect.any(String))
    expect(res.body.item.location).toEqual(expect.any(String))
    expect(res.body.item.threshold).toEqual(expect.any(Number))
    expect(res.body.item.quantity).toEqual(expect.any(Number))
    expect(res.body.item.category_id).toEqual(expect.any(Number))
    expect(res.body.item.code).toEqual(expect.any(String))
  })

})