const { assertNumber } = require("./lib/util");
const { Processor } = require("./lib/processor");
const { DefaultReporter, RunKitReporter } = require("./lib/reporters");
const functions = require("./lib/functions");

// BDD
const { post: after, postEach: afterEach, pre: before, preEach: beforeEach } = functions;
// TDD
const { post: teardown, postEach: suiteTeardown, pre: setup, preEach: suiteSetup } = functions;

module.exports = {
    install: function install(isRunKit = false, timeOut = 500) {
        if (timeOut !== undefined) {
            assertNumber(timeOut);
        }

        const reporter = isRunKit ? RunKitReporter : DefaultReporter;
        const processor = Processor.getProcessor(reporter);

        const params = {
            processor,
            timeOut
        };

        // BDD
        const describe = functions.testBlock.bind(params);
        const it = functions.testCase.bind(params);
        global.context = describe;
        global.describe = describe;
        global.it = it;
        global.specify = it;
        global.after = after;
        global.afterEach = afterEach;
        global.before = before;
        global.beforeEach = beforeEach;

        // TDD
        const suite = functions.testBlock.bind(params);
        const test = functions.testCase.bind(params);
        global.suite = suite;
        global.test = test;
        global.teardown = teardown;
        global.suiteTeardown = suiteTeardown;
        global.setup = setup;
        global.suiteSetup = suiteSetup;
    }
};
