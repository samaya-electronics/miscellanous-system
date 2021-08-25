const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User } = require('../src/database/models')


beforeAll(async () => {
    await sequelize.sync({
      force: true,
    })
    await Role.bulkCreate([
      {name: 'role no1'},
      {name: 'role no2'},
    ])
    return User.bulkCreate([{
      name: "admin",
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

    it('post /login --> login error attempt', async () => {
        const res = await request(app)
        .post('/auth/login')
    
    
        expect(res.statusCode).toEqual(200)
        expect(res.body.err).toEqual(expect.anything())
    })
    
    it('post /login --> post is working, returns result', async () => {
        const res = await request(app)
        .post('/auth/login')
        .send({
            username: "admin",
            password: "admin"
        })
        
        
    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.body.msg).toEqual(expect.any(String))
    expect(res.body.err).not.toEqual(expect.anything())
    expect(res.body.links).toEqual(expect.arrayContaining(['/store', '/requests']))
    })
})
