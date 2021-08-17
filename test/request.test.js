const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models')

beforeAll(() => {
  return sequelize.sync({
    force: true,
  })
});

afterAll(() => {
  return sequelize.close()
})


describe('request I/O --> request test', () => {

  test.each([
    [3,false,'test-req-1',1,10,1],
    [4,false,'test-req-2',2,10,2],
    [5,false,'test-req-3',3,10,3],
  ])('POST /categories --> create 3 requests for requesting test', async (quantity_test,approved_test,user_requesting_id_test, user_approving_id_test,item_id_test) => {
      const res = await request(app)
      .post('/requests')
      .send({
          quantity: quantity_test,
          approved: approved_test,
          user_requesting_id: user_requesting_id_test,
          user_approving_id: user_approving_id,
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