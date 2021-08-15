const request = require('supertest');
const app = require('../src/app');

describe('Sample Test', () => {
    it('GET / --> homePage boolean', () => {
      return request(app).get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            homepage: false
          }    
          )
        )
      })
    })
  })
  