const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

let server;

describe('GET API route', function () {
    beforeEach(function () {
        server = sinon.fakeServer.create();
      });
    
      afterEach(function () {
        server.restore();
      });
    
      it('receives data from the Stack Exchange API', function () {
        server.respondWith('GET', '/', [
          200, { 'Content-Type': 'application/json' }, JSON.stringify(data)
        ]);
    
        server.respond();
    
        expect();
      });
    });