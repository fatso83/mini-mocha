const { assertFunction, assertTitle } = require("./lib/util");
const { Processor, taskType, taskAddedEventName } = require("./lib/processor");
const { metaData } = require("./lib/execute");
const { DefaultReporter, RunKitReporter } = require("./lib/reporters");

/**
 * Purpose of using the "caller" is to
 * keep the each "it"s and "eachHooks" inside the function.
 * I set the metaData attribute in the caller function.
 * (check the "describe" function)
 *
 * TODO:
 * Since "caller" attribute is none standard approach,
 * Lets try to replace this with better approach
 */

function after(fn) {
    assertFunction(fn);
    after.caller[metaData].afterHook = fn;
}

function afterEach(fn) {
    assertFunction(fn);
    afterEach.caller[metaData].afterEachHookCollection.push(fn);
}

function before(fn) {
    assertFunction(fn);
    before.caller[metaData].beforeHook = fn;
}

function beforeEach(fn) {
    assertFunction(fn);
    beforeEach.caller[metaData].beforeEachHookCollection.push(fn);
}

function describe(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    fn[metaData] = {
        title,
        afterHook: null,
        afterEachHookCollection: [],
        beforeHook: null,
        beforeEachHookCollection: [],
        fns: [],
        itCollection: []
    };

    if (describe.caller && describe.caller[metaData]) {
        describe.caller[metaData].fns.push(fn);
    } else {
        this.processor.queue.push({
            type: taskType.describe,
            fn
        });

        this.processor.emit(taskAddedEventName);
    }
}

function it(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    const caller = it.caller ? it.caller[metaData] : undefined;
    if (!caller) {
        this.processor.queue.push({
            type: taskType.it,
            title,
            fn
        });

        this.processor.emit(taskAddedEventName);
    } else {
        caller.itCollection.push({
            title,
            fn
        });
    }
}

module.exports = {
    install: function install(isRunKit = false) {
        const reporter = isRunKit ? RunKitReporter : DefaultReporter;
        const processor = Processor.getInstance(reporter);
        global.describe = describe.bind({
            processor
        });
        global.it = it.bind({
            processor
        });
        global.after = after;
        global.afterEach = afterEach;
        global.before = before;
        global.beforeEach = beforeEach;
    }
};
