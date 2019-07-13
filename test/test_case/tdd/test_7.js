require("../../..").install();

function promiseTimeOut(timeOutValue) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeOutValue);
    });
}

suite("suite timeout (default value) test", function() {
    test("test 1", function() {
        console.log("main 1 test 2");
    });

    test("test 2", function(done) {});
    test("test 3", async function() {
        await promiseTimeOut(600);
    });
});

test("timeout test - test 1", function() {
    console.log("timeout test - test 1");
});
test("timeout test - test 2", function(done) {});
test("timeout test - test 3", async function() {
    await promiseTimeOut(600);
});
