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
  test('overflow test', () => {
    expect(true).toEqual(true)
  })
})