var mm = require("./index");
var test = require("tape");

test("call order", function(assert) {
  var index = 1;
  var calls = {};

  function log(name) {
    if (typeof calls[name] === "undefined") {
      calls[name] = [];
    }
    calls[name].push(index);
    index++;
  }

  mm.describe("block", function() {
    mm.before(() => log("before"));
    mm.beforeEach(() => log("beforeEach"));
    mm.afterEach(() => log("afterEach"));
    mm.after(() => log("after"));

    mm.it("normal sync test", function() {
      // no-op
    });

    mm.it("failing test", function() {
      throw new Error("My error");
    });
  });

  assert.deepEqual(calls.before, [1]);
  assert.deepEqual(calls.beforeEach, [2, 4]);
  assert.deepEqual(calls.afterEach, [3, 5]);
  assert.deepEqual(calls.after, [6]);
  assert.end();
});

test("it should run without describe", function(assert) {
  var called = false;

  mm.it("should be called", function() {
    called = true;
  });

  assert.true(called);
  assert.end();
});

function testArgs(fn) {
  return function(assert) {
    assert.throws(fn.bind(null, function() {}), "title required");
    assert.throws(fn.bind(null, "title"), "missing function");
    assert.end();
  };
}
test("it: title is required", testArgs(mm.it));
test("describe: title is required", testArgs(mm.describe));

//test("async support", function(assert){

//});
