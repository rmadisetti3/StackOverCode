const expect = require('chai');

describe('Code Mirror Editor Tests', function () {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();   
    });

    it('should send a request to stack overflow when it detects //? question', 
        function() {
        
        }
    );

    it('should send a request only after 2 second delay', 
        function() {
        
        }
    );

    it('should not accept queries with no text in it like //? __ ', 
        function() {
        
        }
    );

    it('', 
        function() {
        
        }
    );
})