/* eslint-disable camelcase */
// eslint-disable-next-line strict
'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
//=========================== test the error ==================================///
describe('Web server', () => {
  it('responds with a 404 if a route is not found', () => {
    return mockRequest
      .get('/some-route-that-doesnt-exist')
      .then(results =>{
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });

  describe('web server', () => {
    it('responds with a 500 on error', () => {
      return mockRequest
        .get('/real-error')
        .then(results =>{
          expect(results.status).toBe(500);
        })
        .catch(console.error);
    });
    //////////////////============== test GET ===================/////////////////
    it('respond properly to a get request to /api/v1/category', () => {
      return mockRequest
        .get('/api/v1/category')
        // eslint-disable-next-line quotes
        .send({name : "shoee"})
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
          expect( typeof results.body.results).toBe('object');
        });
    });
    //////////////=========== test POST ============////////////////
    it('respond properly to a post request to /api/v1/category', () => {
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
    it('respond properly to a put request /api/v1/category ', () => {
      return mockRequest
        .post('/api/v1/category')
        .send({ name: 'test name' })
        .then(data => {
          return mockRequest
            .put(`/api/v1/category/:${data.body.id}`)
            .then(results => {
              results.body.name = 'name is updated';
              results.body.id = 2;
              // console.log('************************', results.body);
              expect(results.status).toBe(200);
              expect(typeof results.body).toBe('object');
              expect(results.body.name).toEqual('name is updated');
              expect(results.body.id).toEqual(2);
            });
        });
    });

    it('respond properly to a put request /api/v1/product ', () => {
      return mockRequest
        .post('/api/v1/product')
        .send({ category: 'category of test name' , display_name : 'type of test name', description :'to test our API'})
        .then(data => {
          return mockRequest
            .put(`/api/v1/category/:${data.body.id}`)
            .then(results => {
              results.body.category = 'category of test nameeeee';
              results.body.display_name = 'type of test name';
              results.body.description = 'to test our API';
              results.body.id = 2;
              // console.log('************************', results.body);
              expect(results.status).toBe(200);
              expect(typeof results.body).toBe('object');
              expect(results.body.category).toEqual('category of test nameeeee');
              expect(results.body.display_name).toEqual('type of test name');
              expect(results.body.description).toEqual('to test our API');
              expect(results.body.id).toEqual(2);
            });
        });
    });
  });

});