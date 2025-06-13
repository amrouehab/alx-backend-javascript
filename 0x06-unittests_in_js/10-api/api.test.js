const request = require('request');
const { expect } = require('chai');

describe('API tests', () => {
  const baseUrl = 'http://localhost:7865';

  describe('Index page', () => {
    it('should return correct status code', (done) => {
      request.get(baseUrl, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return correct result', (done) => {
      request.get(baseUrl, (err, res, body) => {
        expect(body).to.equal('Welcome to the payment system');
        done();
      });
    });
  });

  describe('Cart page', () => {
    it('should return correct status code when :id is a number', (done) => {
      request.get(`${baseUrl}/cart/12`, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return correct result when :id is a number', (done) => {
      request.get(`${baseUrl}/cart/12`, (err, res, body) => {
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('should return 404 status code when :id is NOT a number', (done) => {
      request.get(`${baseUrl}/cart/hello`, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('Available payments', () => {
    it('should return correct payment methods', (done) => {
      request.get(`${baseUrl}/available_payments`, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(body)).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
        done();
      });
    });
  });

  describe('Login', () => {
    it('should welcome the user', (done) => {
      const options = {
        url: `${baseUrl}/login`,
        method: 'POST',
        json: true,
        body: { userName: 'Betty' }
      };

      request(options, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Welcome Betty');
        done();
      });
    });

    it('should return 400 for missing userName', (done) => {
      const options = {
        url: `${baseUrl}/login`,
        method: 'POST',
        json: true,
        body: {}
      };

      request(options, (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
    });
  });
});
