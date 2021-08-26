const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User } = require('../src/database/models')


beforeAll(async () => {
  await sequelize.sync({
    force: true,
  })
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
  
afterAll(async () => {
return sequelize.close()
})

describe('login test', () => {

  test('post /login --> login error attempt with no body', async () => {
    const res = await request(app)
      .post('/auth/login')
  
  
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
  })
  
  test.each([
    ['nourhan', 'nourhan', ['/store']],
    ['karim', 'admin', ['/store', '/requests']],
  ])('post /login --> post is working, returns result for appropriate user', async (username, password, links) => {
    const res = await request(app)
      .post('/auth/login')
      .send({
          username,
          password
      })
      
      
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.body.msg).toEqual(expect.any(String))
    expect(res.body.links).toEqual(expect.arrayContaining(links))
  })


  test('post /login --> post is working, not a registered user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
          username: "not a usr",
          password: "dummy data"
      })
      
      
    expect(res.statusCode).toEqual(200)
    expect(res.body.err).toEqual(expect.anything())
    expect(res.body.token).not.toEqual(expect.any(String))
    expect(res.body.msg).toEqual(expect.any(String))
    expect(res.body.links).not.toEqual(expect.arrayContaining(['/store', '/requests']))
  })
})
