const { assertFunction, assertTitle, assertNumber } = require("./lib/util");
const { Processor, TASK_TYPE, TASK_ADDED_EVENT_NAME } = require("./lib/processor");
const { META_DATA } = require("./lib/executor");
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
    after.caller[META_DATA].afterHook = fn;
}

function afterEach(fn) {
    assertFunction(fn);
    afterEach.caller[META_DATA].afterEachHookCollection.push(fn);
}

function before(fn) {
    assertFunction(fn);
    before.caller[META_DATA].beforeHook = fn;
}

function beforeEach(fn) {
    assertFunction(fn);
    beforeEach.caller[META_DATA].beforeEachHookCollection.push(fn);
}

function describe(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    fn[META_DATA] = {
        title,
        afterHook: null,
        afterEachHookCollection: [],
        beforeHook: null,
        beforeEachHookCollection: [],
        fns: [],
        itCollection: [],
        timeOut: this.timeOut
    };

    if (describe.caller && describe.caller[META_DATA]) {
        describe.caller[META_DATA].fns.push(fn);
    } else {
        this.processor.queue.push({
            type: TASK_TYPE.describe,
            fn
        });

        this.processor.emit(TASK_ADDED_EVENT_NAME);
    }
}

function it(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    fn.timeOut = this.timeOut;

    const caller = it.caller ? it.caller[META_DATA] : undefined;
    if (!caller) {
        this.processor.queue.push({
            type: TASK_TYPE.it,
            title,
            fn
        });

        this.processor.emit(TASK_ADDED_EVENT_NAME);
    } else {
        caller.itCollection.push({
            title,
            fn
        });
    }
}

module.exports = {
    install: function install(isRunKit = false, timeOut = 500) {
        if (timeOut !== undefined) {
            assertNumber(timeOut);
        }

        const reporter = isRunKit ? RunKitReporter : DefaultReporter;
        const processor = Processor.getProcessor(reporter);
        global.describe = describe.bind({
            processor,
            timeOut
        });
        global.it = it.bind({
            processor,
            timeOut
        });
        global.after = after;
        global.afterEach = afterEach;
        global.before = before;
        global.beforeEach = beforeEach;
    }
};
