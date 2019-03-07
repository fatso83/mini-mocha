var assert = require("assert");

var d = null;
var doPrint = false;
var its = [];
var beforeEachs = [];
var befores = [];
var afters = [];
var afterEachs = [];
var printFn = console.log.bind(console);
var runningOp = Promise.resolve();

/**
 * @returns Promise
 */
function it(title, fn) {
  assert(typeof title === "string", "title required");
  assert(typeof fn === "function", "missing function");
  var async = !!fn.length;

  its.push(singleTestRun(title, fn));

  // To support running without outer describe block
  // Run each test immediately
  if (!d) {
    runningOp = runningOp.then(runAll.bind(null, its)).then(function() {
      its = [];
    });
  }
}

/**
 * @returns Promise that always resolves (we don't collect results)
 */
function singleTestRun(title, fn) {
  return function() {
    return runAll(beforeEachs)
      .catch(function(err) {
        log(title + ": beforeEach failed:", err.message);
      })
      .then(function runSingleTest() {
        return new Promise(function(resolve, reject) {
          function done(err) {
            err ? resolve() : reject(err);
          }
          fn(done);
        });
      })
      .then(function() {
        log(title, null);
      })
      .catch(function(err) {
        log(title, err.message);
      })
      .then(function(resolve, reject) {
        return runAll(afterEachs);
      });
  };
}

/**
 * @returns Promise
 */
function runAll(funcs) {
  return Promise.all(funcs.map(run));
}

function describe(title, fn) {
  assert(title, "title required");
  assert(typeof fn === "function");

  d = title;
  runningOp = runningOp.then(function() {
    return runAll(befores)
      .then(runAll.bind(null, its))
      .then(runAll.bind(null, afters))
      .then(function() {
        // reset
        its = [];
        befores = [];
        afters = [];
        afterEachs = [];
        beforeEachs = [];
        d = null;
      });
  });
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
  return new Promise(function(resolve, reject) {
    return fn.then(resolve);
  });
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
  },
  doPrint: function(flag) {
    doPrint = flag;
  },
  wait: function() {
    return runningOp;
  }
};
