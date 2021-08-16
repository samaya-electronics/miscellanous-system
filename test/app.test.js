const request = require('supertest');
const app = require('../src/app');

describe('APP test', () => {
  it('GET / --> App is working, returns true', () => {
    return request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            homepage: true
          })
        )
      })
  })
})


describe('APP test', () => {
  it('GET / --> App is working, returns true', () => {
    return request(app).get('/auth/login')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            status : true,
            links: ['/home','/items', '/catagories']
        })
        )
      })
  })
})