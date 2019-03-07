var assert = require("assert");

var d = null;
var doPrint = false;
var its = [];
var beforeEachs = [];
var befores = [];
var afters = [];
var afterEachs = [];
var printFn = console.log.bind(console);

function it(title, fn) {
  assert(typeof title === "string", "title required");
  assert(typeof fn === "function", "missing function");

  its.push(function() {
    if (fn.length) return unsupported("async/callback testing")();

    beforeEachs.forEach(run);
    try {
      fn();
      log(title, null);
    } catch (err) {
      log(title, err.message);
    }
    afterEachs.forEach(run);
  });

  // To support running without outer describe block
  if (!d) {
    its.forEach(run);
    its = [];
  }
}

function describe(title, fn) {
  assert(title, "title required");
  assert(typeof fn === "function");

  d = title;
  fn();
  befores.forEach(run);
  its.forEach(run);
  afters.forEach(run);

  // reset
  its = [];
  befores = [];
  afters = [];
  afterEachs = [];
  beforeEachs = [];
  d = null;
}

function before(fn) {
  befores.push(fn);
}

function after(fn) {
  afters.push(fn);
}

function beforeEach(fn) {
  beforeEachs.push(fn);
}

function afterEach(fn) {
  afterEachs.push(fn);
}

function log(title, err) {
  var status = err ? `❌. ${err}` : "✔️";
  if (doPrint) {
    printFn((d ? `${d}: ` : "") + `${title}: ${status}`);
  }
}
function run(fn) {
  fn();
}
function unsupported(title) {
  return function() {
    console.error("This operation is unsupported: " + title);
  };
}

function install() {
  doPrint = true;
  global.describe = describe;
  global.it = it;
  global.before = before;
  global.after = after;
  global.beforeEach = beforeEach;
  global.afterEach = afterEach;
}

module.exports = {
  describe: describe,
  it: it,
  before: before,
  after: after,
  beforeEach: beforeEach,
  afterEach: afterEach,
  install: install,
  setPrint: function(fn) {
    printFn = fn;
  }
};
