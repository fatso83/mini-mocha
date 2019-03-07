var mm = require("./index");
var test = require("tape");
var sinon = require("sinon");

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

  mm.wait().then(function() {
    assert.deepEqual(calls.before, [1]);
    assert.deepEqual(calls.beforeEach, [2, 4]);
    assert.deepEqual(calls.afterEach, [3, 5]);
    assert.deepEqual(calls.after, [6]);
    assert.end();
  });
});

test("it should run without describe", function(assert) {
  var fake = sinon.fake();
  mm.it("should be called", fake);

  assert.true(fake.called);
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

test("async support", function(t) {
  t.test("it: call callback on completion ends test", function(st) {
    st.plan(2);

    var fakePrint = sinon.fake();
    mm.setPrint();
    mm.doPrint(true);

    mm.it("my title", function(done) {
      setTimeout(function() {
        st.false(fakePrint.called);
        done();
        st.true(fakePrint.calledWith(/my title/));
        st.end();
      }, 0);
    });
  });
});
