const request = require('request');
const { expect } = require('chai');

describe('Cart page', () => {
  const baseUrl = 'http://localhost:7865';

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

  it('should return "Not Found" when :id is NOT a number', (done) => {
    request.get(`${baseUrl}/cart/hello`, (err, res, body) => {
      expect(body).to.equal('Not Found');
      done();
    });
  });
});
