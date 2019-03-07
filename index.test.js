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
