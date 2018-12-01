let server;

let data = {
    title: "How to create a for loop?",
    excerpt: "for (let i = 0; i < 10; i++) { let sum; sum  = sum + i; }"
}


describe('GET API route', function () {
    beforeEach(function () {
        server = sinon.fakeServer.create();
      });
    
      afterEach(function () {
        server.restore();
      });
    
      it('receives data from the Stack Exchange API', function () {
        server.respondWith('GET', '/api/search', [
          200, { 'Content-Type': 'application/json' }, JSON.stringify(data)
        ]);
    
        $('#response').trigger('click');

        server.respond();
    
        expect($('#response').text()).to.equal('for (let i = 0; i < 10; i++) { let sum; sum  = sum + i; }');
      });
    });