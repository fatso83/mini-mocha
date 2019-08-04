require("../../..").install();

function promiseTimeOut(timeOutValue) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeOutValue);
    });
}

describe("describe timeout (default value) test", function() {
    it("it 1", function() {
        console.log("main 1 it 2");
    });

    it("it 2", function(done) {});
    it("it 3", async function() {
        await promiseTimeOut(600);
    });
});

it("timeout test - it 1", function() {
    console.log("timeout test - it 1");
});
it("timeout test - it 2", function(done) {});
it("timeout test - it 3", async function() {
    await promiseTimeOut(600);
});
