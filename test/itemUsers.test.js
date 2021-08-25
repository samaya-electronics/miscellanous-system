const request = require('supertest');
const app = require('../src/app');
const { sequelize, Role, User, Item, Category } = require('../src/database/models')

beforeAll(async () => {
  return sequelize.sync({
    force: true,
  })
});

afterAll(() => {
  return sequelize.close()
})

describe('Item I/O --> Category dependent', () => {
  console.log("true")

  // test('testing associations with itemAuth --> ', async () => {
  //   await Role.bulkCreate([
  //     {name: 'role no1'},
  //     {name: 'role no2'},
  //   ])
  //   const user1 = await User.create({
  //     name: "karim",
  //     role_id: 1
  //   })
  //   const user2 = await User.create({
  //     name: "osama",
  //     role_id: 2
  //   })
  //   const user3 = await User.create({
  //     name: "nourhan",
  //     role_id: 1
  //   })
  //   await Category.bulkCreate([
  //     {name: 'test-cat-1'},
  //     {name: 'test-cat-2'},
  //     {name: 'test-cat-3'}
  //   ])
  //   const item = await Item.create({
  //     name: "test-item-1",
  //     quantity: 50,
  //     threshold: 30,
  //     location: "test-loc-1",
  //     category_id: 1,
  //     code: "125626werfs"
  //   })

  //   const users = await User.findAll()


  //   // while (i <= users.length){
  //   //   await item.addUser(users[i-1], {
  //   //     through: {
  //   //       order: orders[i-1],
  //   //       leader_approve: true
  //   //     }
  //   //   }
  //   //   )
  //   //   i++
  //   // }

  //   for await (const [i, user] of users.entries()){
  //     await item.addUser(user, {
  //       through: {
  //         order: i+1,
  //         leader_approve: true
  //       }
  //     })
  //   }
    
  //   // await item.setUsers([])

  //   // i = 1
  //   // while (i <= 3){
  //   //   await item.addUser(users[i-1], {
  //   //     through: {
  //   //       order: orders[i-1],
  //   //       leader_approve: true
  //   //     }
  //   //   })
  //   //   i++
  //   // }

  })