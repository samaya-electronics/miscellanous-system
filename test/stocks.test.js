const request = require('supertest');
const app = require('../src/app');
const { sequelize, Item, Category, Area, Section, Box, Stock, Role, User } = require('../src/database/models')
const itemsServices = require('../src/database/services/itemService')

beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })

	await Role.bulkCreate([
    {name: 'admin'},
    {name: 'superuser'},
  ])

  await User.bulkCreate([{
    name: "karim",
    role_id: 1
  },{
    name: "sa3dawy",
    role_id: 2
  }
  ])

  await Area.bulkCreate([
    {name: 'injection', code: 'in'},
    {name: 'hetronic', code: 'hr'},
    {name: 'polish', code: 'pl'}
  ])

  await Section.bulkCreate([
    {name: 'section 8', code: 's8', area_id: 1},
    {name: 'section 9', code: 's9', area_id: 3},
    {name: 'section 11', code: 's11', area_id: 3}
  ])

  await Box.bulkCreate([
    {name: '4', code: 'b4', section_id: 1},
    {name: '2', code: 'b2', section_id: 1},
    {name: '47', code: 'b47', section_id: 2},
    {name: '4', code: 'b4', section_id: 3},
    {name: '31', code: 'b31', section_id: 3},
  ])

  await Category.bulkCreate([
    {name: 'test-cat-1'},
    {name: 'test-cat-2'},
    {name: 'test-cat-3'}
  ])

  await Item.bulkCreate([
    {
      name: "test-item-1",
      threshold: 30,
      category_id: 1,
      code: "125626werfs"
    },
    {
      name: "test-item-2",
      threshold: 30,
      category_id: 2,
      code :"12566werfs"
    },
    {
      name: "test-item-3",
      threshold: 30,
      category_id: 1,
      code :"125686werfs"
    },
  ])

  return Stock.bulkCreate([
		{
			item_id: 1,
			box_id: 1,
			quantity: 500
		},{
			item_id: 1,
			box_id: 2,
			quantity: 100
		},{
			item_id: 2,
			box_id: 3,
			quantity: 200
		},
  ])

});

afterAll(() => {
  return sequelize.close()
})

describe('Stocks I/O Testing', () => {

	test.each([
		'karim',
		'sa3dawy'
	])('GET /stocks --> getting all stocks in database', async (test_username) => {
		const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: test_username,
      password:'password'
		})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
		
		const res = await request(app)
		.get('/stocks')
		.set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', test_username)
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.err).not.toEqual(expect.anything())
		expect(res.body.stocks.length).toBeGreaterThanOrEqual(3)
	})


	test.each([
		'karim',
		'sa3dawy'
	])('GET /stocks --> getting stock with pk 2', async (test_username) => {
		const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: test_username,
      password:'password'
		})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
		
		const res = await request(app)
		.get('/stocks/2')
		.set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', test_username)
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.err).not.toEqual(expect.anything())
		expect(res.body.stock).toEqual(expect.anything())
	})

	test('POST /stocks --> creating new stock', async () => {
		const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'sa3dawy',
      password:'password'
		})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
		
		const res = await request(app)
		.post('/stocks')
    .set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'sa3dawy')
		.send({
			item_id: 3,
			box_id: 4,
			quantity: 230
		})
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.err).not.toEqual(expect.anything())
		expect(res.body.stock).toEqual(expect.anything())
	})
	
	
	
	test('PUT /stocks --> editing and adding quantity to stock', async () => {
		const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'sa3dawy',
      password:'password'
		})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
		
		const res = await request(app)
		.put('/stocks/2')
    .set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'sa3dawy')
		.send({
			item_id: 3,
			box_id: 4,
			quantity: 300
		})
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.err).not.toEqual(expect.anything())
		expect(res.body.stock).toEqual(expect.anything())
	})


  test('DELETE /stocks --> deleting and entire stock', async () => {
		const resAuth = await request(app)
    .post('/auth/login')
    .send({
      username: 'sa3dawy',
      password:'password'
		})
    expect(resAuth.statusCode).toEqual(200)
    expect(resAuth.body.token).toEqual(expect.anything())
		
		const res = await request(app)
		.delete('/stocks/3')
		.set('authorization', `Bearer ${resAuth.body.token}`)
    .set('username', 'sa3dawy')
		
		expect(res.statusCode).toEqual(200)
		expect(res.body.err).not.toEqual(expect.anything())
		expect(res.body.stock).toEqual(expect.anything())
	})

  test('GET Quantity by service', async () => {
		const quantity = await itemsServices.getItemQuantity(1)
    
    expect(quantity).toBeGreaterThan(0)
	})

})