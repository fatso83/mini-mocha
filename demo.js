require('./index');

describe("issue #101 ES5 version", function() {
    var Foo = {
        myMethod: function() { return "original"; }
    }

    before(() => console.log("before"));
    after(() => console.log("after"));
    beforeEach(() => console.log("before each"));
    afterEach(() => console.log("after each"));

    it("normal sync test", function() {
        // no-op
    });

    it("failing test", function() {
        throw new Error("My error");
    });

    it("async test (not supported)", function(done) {
        console.warn("should never get here");
    });
});
