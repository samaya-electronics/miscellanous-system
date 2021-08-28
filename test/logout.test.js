const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User, Category, Item } = require('../src/database/models')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })
  await Category.bulkCreate([
    {name: 'test-cat-1'},
    {name: 'test-cat-2'},
    {name: 'test-cat-3'}
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
    {name: 'user'},
  ])
  return User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "nourhan",
    role_id: 2
  }])
});

afterAll(() => {
  return sequelize.close()
})

describe('Auth system testing', () => {

  test.each([
    ['karim'],
    ['nourhan']
  ])('POST /login --> logging in to get token', async (username) => {
    const res = await request(app)
    .post('/auth/login')
    .send({
      username: username,
      password: 'password'
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toEqual(expect.anything())

    const res2 = await request(app)
      .get('/items')
      .send({
        token: res.body.token,
        username: username
      })

    expect(res2.statusCode).toEqual(200)
    expect(res2.body.items).toEqual(expect.anything())
    
    const res3 = await request(app)
			.delete('/auth/logout')
			.send({
				username: username,
				token: res.body.token
			})
    expect(res3.statusCode).toEqual(200)
    expect(res3.body.msg).toEqual("User logged out successfully")
  })

})