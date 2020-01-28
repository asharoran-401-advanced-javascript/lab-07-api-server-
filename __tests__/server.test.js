'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Web server', () => {
  it('responds with a 404 if a route is not found', () => {
    return mockRequest
      .get('/some-route-that-doesnt-exist')
      .then(results =>{
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });

  it('respond properly to a get request to /api/v1/category', () => {
    return mockRequest
      .get('/api/v1/category')
      .then(results => {
        expect(results.status).toBe(200);
        console.log('resullllllllllllt for category', results.body);
        expect(typeof results.body.results).toBe('object');
      });
  });

  it('respond properly to get request to api/v1/product' , () =>{
      return mockRequest
      .get('/api/v1/product')
      .then(results => {
        expect(results.status).toBe(200);
        console.log('resullllllllllllt for product', results.body);
        expect( typeof results.body.results).toBe('object')
      });
  });

  it('respond properly to a post request to /api/v1/food', () => {
    return mockRequest
      .post('/api/v1/category')
      .send({ name: 'test name' })
      .then(results => {
        expect(results.status).toBe(201);
        expect(results.body.name).toEqual('test name');
        expect(results.body).toBeDefined();
      });
  });
  it('respond properly to POST request to /api/v1/product' , () =>{
      return mockRequest
      .post('/api/v1/product')
      .send({ category: 'category of test name' , display_name : 'type of test name', description :'to test our API'})
      .then( results =>{
          expect(results.status).toBe(201);
          expect(results.body.category).toEqual('category of test name');
          expect(results.body.display_name).toEqual('type of test name');
          expect(results.body.description).toEqual('to test our API');
          expect(results.body).toBeDefined();
      });
  });
  

});