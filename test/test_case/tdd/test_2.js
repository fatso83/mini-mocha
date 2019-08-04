require("../../..").install();

suite("suite 1", function() {
    setup(function() {
        console.log("==> suite 1 setup");
    });

    teardown(function() {
        console.log("==> suite 1 teardown");
    });

    suiteSetup(function() {
        console.log("==> suite 1 suiteSetup");
    });

    suiteTeardown(() => {
        console.log("==> suite 1 suiteTeardown");
    });

    test("main 1 test 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 1 test 1 --> ", y);
    });

    test("main 1 test 2", function() {
        console.log("==> main 1 test 2");
    });
});

suite("suite 2", function() {
    setup(function() {
        console.log("==> suite 2 setup");
    });

    teardown(function() {
        console.log("==> suite 2 teardown");
    });

    suiteSetup(function() {
        console.log("==> suite 2 suiteSetup");
    });

    suiteTeardown(() => {
        console.log("==> suite 2 suiteTeardown");
    });

    test("main 2 test 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 2 test 2 --> ", y);
    });

    test("main 2 test 2", function() {
        console.log("==> main 2 test 2");
    });
});

suite("suite 3", function() {
    setup(function() {
        console.log("==> suite 3 setup");
    });

    teardown(function() {
        console.log("==> suite 3 teardown");
    });

    suiteSetup(function() {
        console.log("==> suite 3 suiteSetup");
    });

    suiteTeardown(() => {
        console.log("==> suite 3 suiteTeardown");
    });

    test("main 3 test 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 3 test 1 --> ", y);
    });

    test("main 3 test 2", function() {
        console.log("==> main 3 test 2");
        throw new Error("failed");
    });
});

suite("suite 4", function() {
    setup(function() {
        console.log("==> suite 4 setup");
    });

    teardown(async function() {
        const s = await Promise.resolve("4");
        console.log("==> suite 4 teardown --> ", s);
    });

    suiteSetup(function() {
        console.log("==> suite 4 suiteSetup");
    });

    suiteTeardown(() => {
        console.log("==> suite 4 suiteTeardown");
    });

    test("main 4 test 1", async function() {
        const y = await Promise.resolve("1");
        console.log("==> main 4 test 1 --> ", y);
    });

    test("main 4 test 2", function() {
        console.log("==> main 4 test 2");
        throw new Error("failed");
    });
});
