require("../../..").install();

suite("suite test with done", function() {
    setup(function() {
        console.log("==> suite test with done setup");
    });

    teardown(function() {
        console.log("==> suite test with done teardown");
    });

    suiteSetup(function() {
        console.log("==> suite test with done suiteSetup");
    });

    suiteTeardown(() => {
        console.log("==> suite test with done suiteTeardown");
    });

    test("main with done test 1", function() {
        console.log("==> main with done test 2");
    });

    test("main with done test 2 - async", async function() {
        const msg = await Promise.resolve("==> main with done test 2 - async");
        console.log(msg);
    });

    test("main with done test 3 - error object as an error", function(done) {
        done(new Error("done error"));
    });

    test("main with done test 4 - string as an error", function(done) {
        done("error message");
    });

    test("main with done test 4 - no error", function(done) {
        done();
    });
});
