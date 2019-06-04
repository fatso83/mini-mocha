require("./").install();

// This bit is just to easily update the README
describe("issue #101 ES5 version", function() {
    it("shows a normal sync test", function() {
        // passes
    });

    it("will fail", function() {
        throw new Error("My error");
    });

    it("shows a normal async test using callbacks", function(done) {
        setTimeout(() => {
            done();
        });
    });

    it("will fail async", function(done) {
        setTimeout(() => {
            done(new Error("My error"));
        });
    });
});

describe("async/await (aka Promises) feature", function() {
    it("should passe as expected", async function() {
        await new Promise(function(resolve, reject) {
            setTimeout(resolve, 500);
        });
    });

    it("should fail", async function() {
        await new Promise(function(resolve, reject) {
            setTimeout(reject, 500, new TypeError("Some wrong type"));
        });
    });
});
