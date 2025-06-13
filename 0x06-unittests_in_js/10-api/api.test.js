const request = require('request');
const { expect } = require('chai');

describe('API Integration Test', function() {
  const API_URL = 'http://localhost:7865';

  describe('Index page', function() {
    it('GET / returns status 200 and correct message', function(done) {
      request.get(API_URL, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  describe('Cart page', function() {
    it('GET /cart/:id with valid :id returns 200 and correct message', function(done) {
      request.get(`${API_URL}/cart/12`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('GET /cart/:id with non-numeric :id returns 404', function(done) {
      request.get(`${API_URL}/cart/hello`, (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('/available_payments', function() {
    it('GET /available_payments returns correct payment methods object', function(done) {
      request.get(`${API_URL}/available_payments`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        const expected = {
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        };
        expect(JSON.parse(body)).to.deep.equal(expected);
        done();
      });
    });
  });

  describe('/login', function() {
    it('POST /login returns welcome message with username', function(done) {
      const options = {
        url: `${API_URL}/login`,
        method: 'POST',
        json: {
          userName: 'Betty'
        }
      };
      request(options, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      });
    });
  });
});
