const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User } = require('../src/database/models')
const userServices = require('../src/database/services/userService')

beforeAll(async () => {
  await sequelize.sync({force: true})

  await Role.bulkCreate([
    {name: 'test-role-1'},
    {name: 'test-role-2'},
    {name: 'test-role-3'},
    {name: 'test-role-4'},
    {name: 'test-role-5'},
  ])

  return User.bulkCreate([{
    name: "karim",
    user_name: "karim1111",
    role_id: 1
  },{
    name: "nourhan",
    user_name:"nourhan12133",
    role_id: 2
  }])
});

afterAll(async () => {
  return sequelize.close()
})

describe('Services testing', () => {
    test('testing get user by role', async () => {
        const result = await userServices.getUsersByRole(2)

        expect(result).toEqual(object)
    })
})