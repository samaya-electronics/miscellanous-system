const request = require('supertest');
const app = require('../src/app');
const { sequelize, Category, Item, User, Role, Request, Stock, Area, Section, Box } = require('../src/database/models')

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
    category_id: 1
  },{
    name: "item-2",
    quantity: 90,
    threshold: 40,
    code: "klsjd45",
    category_id: 2
  },{
    name: "item-3",
    quantity: 102,
    threshold: 23,
    code: "klsjd45",
    category_id: 1
  }])


  await Area.bulkCreate([
    {name: 'area-1', code: 'A1'},
    {name: 'area-2', code: 'A2'},
    {name: 'area-3', code: 'A3'},
  ])
  await Section.bulkCreate([
    {name: 'section-1', code: 'S1', area_id: 1},
    {name: 'section-2', code: 'S2', area_id: 1},
    {name: 'section-3', code: 'S3', area_id: 2},
  ])
  await Box.bulkCreate([
    {name: 'Box-1', code: 'B1', section_id: 2},
    {name: 'Box-2', code: 'B2', section_id: 2},
    {name: 'Box-3', code: 'B3', section_id: 3},
  ])
  await Stock.bulkCreate([
    {item_id: 1, box_id: 1, quantity: 30},
    {item_id: 2, box_id: 2, quantity: 40},
    {item_id: 3, box_id: 3, quantity: 50},
  ])
  await Role.bulkCreate([
    {name: 'admin'},
    {name: 'teamleader'},
    {name: 'user'},
    {name: 'superuser'}
  ])
  await User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "nourhan",
    role_id: 2,
    user_leader_id: 1
  },{
    name: "hazem",
    role_id: 3,
    user_leader_id: 1
  },{
    name: "osama",
    role_id: 4,
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
    const resAuth = await request(app)
      .post('/auth/login')
      .send({
        username: "karim"
      })

    const res = await request(app)
      .get('/requests')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')

      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.requests.length).toEqual(4)
  })

  test('GET /requests --> get specific user request depending on team member', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "hazem"
    })

    const res = await request(app)
      .get('/requests')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'hazem')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.requests).toEqual(expect.anything())
    expect(res.body.requests.length).toEqual(2)
  })



  test('GET /requests --> get specific user request depending on being leader', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "nourhan"
    })

    const res = await request(app)
      .get('/requests')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'nourhan')
    
    expect(res.statusCode).toEqual(200)
    expect(res.body.requests).toEqual(expect.anything())
    expect(res.body.requests.length).toEqual(1)
  })




  test('GET /requests/:pk --> get request by pk', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .get('/requests/1')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request).toEqual(expect.objectContaining({
      quantity: expect.any(Number),
    }))
  })



  test.each([
    ['karim',3,1,1],
    ['nourhan',4,2,2],
    ['hazem',5,3,3],
    ['osama',5,4,3],
  ])('POST /requests --> create 3 requests', async (username, quantity_test, user_requesting_id_test, item_id_test) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username
    })

    const res = await request(app)
      .post('/requests')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', username)
      .send({
        quantity: quantity_test,
        item_id: item_id_test,
        user_requesting_id: user_requesting_id_test,
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request.quantity).toEqual(quantity_test)
    expect(res.body.request.user_requesting_id).toEqual(user_requesting_id_test)
    expect(res.body.request.item_id).toEqual(item_id_test)
  })



  test.each([
    ['nourhan', 3],
    ['osama', 3]
  ])('PUT /requests/:id/approve --> request approval by team leader and superuser', async (username, req_id) => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username
    })

    const res = await request(app)
      .put(`/requests/${req_id}/approve`)
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', username)

    expect(res.statusCode).toEqual(200)
    expect(res.body.request).toEqual(expect.anything())
    expect(res.body.err).not.toEqual(expect.anything())
  })



  test('DELETE /requests --> deleting request', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .delete('/requests/1')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.request).toEqual(expect.objectContaining({
      quantity: expect.any(Number),
    }))
  })


  test('DELETE /requests --> deleting request that does not belong to user', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "hazem"
    })

    const res = await request(app)
      .delete('/requests/2')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'hazem')


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.request).not.toEqual(expect.anything())
  })


  test('DELETE /requests --> error deleting request', async () => {
    const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: "karim"
    })

    const res = await request(app)
      .delete('/requests/30')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'karim')


    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
  })



  test('GET /requests/deliveries --> get all deliveries for admin', async () => {
    const resAuth = await request(app)
      .post('/auth/login')
      .send({
        username: "osama"
      })

    const res = await request(app)
      .get('/requests/deliveries')
      .set('authorization', `Bearer ${resAuth.body.token}`)
      .set('username', 'osama')

      expect(res.statusCode).toEqual(200)
      expect(res.body.err).not.toEqual(expect.anything())
      expect(res.body.requests.length).toBeGreaterThanOrEqual(1)
  })


  

  // test('PUT /requests/:id/deliveries/approve --> request approval by team leader and superuser', async () => {
  //   const resAuth = await request(app)
  //   .post('/auth/login')
  //   .send({
  //     username: 'osama'
  //   })

  //   const res = await request(app)
  //     .put(`/requests/3/deliveries/approve`)
  //     .set('authorization', `Bearer ${resAuth.body.token}`)
  //     .set('username', 'osama')
  //     .send({
  //       approved: true
  //     })

  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body.request).toEqual(expect.anything())
  //   expect(res.body.err).not.toEqual(expect.anything())
  // })

})