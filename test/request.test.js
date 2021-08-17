const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

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

  beforeAll(() => {
    await Category.bulkCreate([
      {name: 'test-cat-1'},
      {name: 'test-cat-2'},
      {name: 'test-cat-3'},
      {name: 'test-cat-4'},
      {name: 'test-cat-5'},
     ]) 
    await item.bulkCreate([{
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
    await user.bulkCreate([{
      name: "karim",
      username: "karim1111",
      role_id: 1
    },{
      name: "nourhan",
      username:"nourhan12133",
      role_id: 2
    }])
    return role.bulkCreate([
      {name: 'role no1'},
      {name: 'role no2'},
    ])
  })

  afterAll(() => {
    return sequelize.close})
 })


describe('request I/O --> request test', () => {

  test.each([
    [3,false,1,2,1],
    // [4,false,2,2,2],
    // [5,false,3,2,3],
  ])('POST /categories --> create 3 requests for requesting test', async (quantity_test,approved_test,user_requesting_id_test, user_approving_id_test,item_id_test) => {
      const res = await request(app)
      .post('/requests')
      .send({
          quantity: quantity_test,
          approved: approved_test,
          user_requesting_id: user_requesting_id_test,
          user_approving_id: user_approving_id_test,
          item_id: item_id_test
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body.quantity).toEqual(quantity_test)
      expect(res.body.approved).toEqual(approved_test)
      expect(res.body.user_requesting_id).toEqual(user_requesting_id_test)
      expect(res.body.user_approving_id).toEqual(user_approving_id_test)
      expect(res.body.item_id).toEqual(item_id_test)
  })
})