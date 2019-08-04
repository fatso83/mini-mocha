require("../../..").install(false, 800);

function promiseTimeOut(timeOutValue) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeOutValue);
    });
}

suite("suite timeout (new value) test", function() {
    test("test 1", function() {
        console.log("main 1 test 2");
    });

    test("test 2", function(done) {});
    test("test 3", async function() {
        await promiseTimeOut(600);
    });
});

test("timeout test (new value) - test 1", function() {
    console.log("timeout test (new value) - test 1");
});
test("timeout test (new value) - test 2", function(done) {});
test("timeout test (new value) - test 3", async function() {
    await promiseTimeOut(600);
});
