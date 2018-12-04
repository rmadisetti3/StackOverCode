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

describe('selectBox', function() {
  it('border should turn red if box is clicked', function(){
    $('#response').trigger('click');
    expect($('#response').hasClass('active')).to.equal(true);
  });
});
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


    describe('change language', function () {
          it('changes to Javascript', function () {
            $('#js').trigger('click');
            expect($('.custom-select').text()).to.equal('JavaScript');
          });
          it('changes to HTML', function () {
            $('#html').trigger('click');
            expect($('.custom-select').text()).to.equal('HTML');
          });
          it('changes to CSS', function () {
            $('#css').trigger('click');
            expect($('.custom-select').text()).to.equal('CSS');
          });
        });
