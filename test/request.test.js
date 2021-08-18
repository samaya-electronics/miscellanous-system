const request = require('supertest');
const app = require('../src/app');
const { sequelize, Category, Item, User, Role, Request } = require('../src/models')

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
    location: "wanta mal ahlk anta ana al sb3awy",
    category_id: 1
  },{
    name: "item-2",
    quantity: 90,
    threshold: 40,
    location: "wanta mal ahlk anta ana al sb3awy tany",
    category_id: 2
  },{
    name: "item-3",
    quantity: 102,
    threshold: 23,
    location: "wanta mal ahlk anta ana al sb3awy talt",
    category_id: 1
  }])
  await Role.bulkCreate([
    {name: 'role no1'},
    {name: 'role no2'},
  ])
  await User.bulkCreate([{
    name: "karim",
    user_name: "karim1111",
    role_id: 1
  },{
    name: "nourhan",
    user_name:"nourhan12133",
    role_id: 2
  }])
  return Request.bulkCreate([
    {
      quantity: 30,
      user_requesting_id: 1,
      user_approving_id: 2,
      item_id: 2
    },
    {
      quantity: 20,
      user_requesting_id: 2,
      user_approving_id: 1,
      item_id: 1
    }
  ])
});

afterAll(async () => {
  return sequelize.close()
})


describe('request I/O --> request test', () => {

  test('GET /requests --> get all requests', async () => {
    const res = await request(app)
      .get('/requests')

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(2)
  })

  test('GET /requests/:pk --> get request by pk', async () => {
    const res = await request(app)
      .get('/requests/1')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      quantity: expect.any(Number),
      user_approving_id: expect.any(Number),
    }))
  })

  test.each([
    [3,1,2,1],
    // [4,false,2,2,2],
    // [5,false,3,2,3],
  ])('POST /requests --> create 3 requests', async (quantity_test,user_requesting_id_test, user_approving_id_test,item_id_test) => {
      const res = await request(app)
      .post('/requests')
      .send({
          quantity: quantity_test,
          user_requesting_pk: user_requesting_id_test,
          user_approving_pk: user_approving_id_test,
          item_pk: item_id_test
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body.quantity).toEqual(quantity_test)
      expect(res.body.approved).toEqual(false)
      console.log(res.body);
      expect(res.body.user_requesting_id).toEqual(user_requesting_id_test)
      expect(res.body.user_approving_id).toEqual(user_approving_id_test)
      expect(res.body.item_id).toEqual(item_id_test)
  })
})