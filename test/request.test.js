const request = require('supertest');
const app = require('../src/app');
const { sequelize, Category, Item, User, Role, Request } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })

  await Category.bulkCreate([
    {name: 'test-cat-1'},
    {name: 'test-cat-2'},
    {name: 'test-cat-3'},
    {name: 'test-cat-4'},
    {name: 'test-cat-5'},
   ]) 
  await Item.bulkCreate([{
    name: "item-1",
    quantity: 50,
    threshold: 20,
    code: "klsjd45",
    location: "wanta mal ahlk anta ana al sb3awy",
    category_id: 1
  },{
    name: "item-2",
    quantity: 90,
    threshold: 40,
    code: "klsjd45",
    location: "wanta mal ahlk anta ana al sb3awy tany",
    category_id: 2
  },{
    name: "item-3",
    quantity: 102,
    threshold: 23,
    code: "klsjd45",
    location: "wanta mal ahlk anta ana al sb3awy talt",
    category_id: 1
  }])
  await Role.bulkCreate([
    {name: 'admin'},
    {name: 'teamleader'},
    {name: 'user'},
  ])
  await User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "nourhan",
    role_id: 2
  },{
    name: "hazem",
    role_id: 3,
    user_leader_id: 1
  }
  ])
  return Request.bulkCreate([
    {
      quantity: 30,
      user_requesting_id: 1,
      item_id: 2
    },
    {
      quantity: 20,
      user_requesting_id: 2,
      item_id: 1,
      leader_approved: true
    },{
      quantity: 30,
      user_requesting_id: 3,
      item_id: 1
    },{
      quantity: 10,
      user_requesting_id: 3,
      item_id: 2
    }
  ])
});

afterAll(async () => {
  return sequelize.close()
})









describe('request I/O --> request test', () => {

  test('GET /requests --> get all requests for admin', async () => {
    const res_login = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })

    const res = await request(app)
      .get('/requests')
      .send({
        token: res_login.body.token,
        username: 'karim'
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.requests.length).toEqual(4)
  })
  


  test('GET /requests --> get specific user request depending on team member', async () => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "hazem"
    })

    const res = await request(app)
      .get('/requests')
      .send({
        token: res_login.body.token,
        username: 'hazem'
      })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.requests).toEqual(expect.anything())
    expect(res.body.requests.length).toEqual(2)
  })



  test('GET /requests --> get specific user request depending on being leader', async () => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "nourhan"
    })

    const res = await request(app)
      .get('/requests')
      .send({
        token: res_login.body.token,
        username: 'nourhan'
      })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.requests).toEqual(expect.anything())
    expect(res.body.requests.length).toEqual(1)
  })




  test('GET /requests/:pk --> get request by pk', async () => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .get('/requests/1')
      .send({
        token: res_login.body.token,
        username: 'karim'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request).toEqual(expect.objectContaining({
      quantity: expect.any(Number),
    }))
  })




  test.each([
    [3,1,1],
    [4,2,2],
    [5,2,3],
  ])('POST /requests --> create 3 requests', async (quantity_test, user_requesting_id_test, item_id_test) => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .post('/requests')
      .send({
        quantity: quantity_test,
        item_id: item_id_test,
        user_requesting_id: user_requesting_id_test,
        token: res_login.body.token,
        username: 'karim'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request.quantity).toEqual(quantity_test)
    expect(res.body.request.user_requesting_id).toEqual(user_requesting_id_test)
    expect(res.body.request.item_id).toEqual(item_id_test)
  })

  test('DELETE /requests --> deleting request', async () => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .delete('/requests/1')
      .send({
        token: res_login.body.token,
        username: 'karim'
      })


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request).toEqual(expect.objectContaining({
      quantity: expect.any(Number),
    }))
  })

  test('DELETE /requests --> error deleting request', async () => {
    const res_login = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .delete('/requests/30')
      .send({
        token: res_login.body.token,
        username: 'karim'
      })


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
  })

})