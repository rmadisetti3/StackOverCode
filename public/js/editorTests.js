mocha.ui('bdd');
mocha.reporter('html');
const expect = chai.expect;

describe('Code Mirror Editor Tests', function () {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });
 
    afterEach(function () {
        server.restore();   
    });

    it('should send a request to stack overflow when it detects //? question', 
        function () {
            let languageDiv = $(".select-items").children()[Math.floor(Math.random()*3)];
            languageDiv.click();
            editor.currentEditor.doc.setValue("//? for loop");
            setTimeout(expect($(".answer").length > 0).is.true, 3000);
            // expect($(".answer").length > 0).is.true;
        }
    );

    it('should send a request only after 2 second delay', 
        function () {
        
        }
    );

    it('should not accept queries with no text in it like //? __ ', 
        function () {
        
        }
    );

    it('asdf', 
        function () {
        
        }
    );
})
