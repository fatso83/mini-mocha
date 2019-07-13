const { assertFunction, assertTitle } = require("./util");
const { TASK_TYPE, TASK_ADDED_EVENT_NAME } = require("./processor");
const { META_DATA } = require("./executor");

/**
 * Purpose of using the "caller" is to
 * keep the each "testCase"s and "eachHooks" inside the function.
 * I set the metaData attribute in the caller function.
 * (check the "testBlock" function)
 *
 * TODO:
 * Since "caller" attribute is none standard approach,
 * Lets try to replace this with better approach
 */

function post(fn) {
    assertFunction(fn);
    post.caller[META_DATA].postHook = fn;
}

function postEach(fn) {
    assertFunction(fn);
    postEach.caller[META_DATA].postEachHookCollection.push(fn);
}

function pre(fn) {
    assertFunction(fn);
    pre.caller[META_DATA].preHook = fn;
}

function preEach(fn) {
    assertFunction(fn);
    preEach.caller[META_DATA].preEachHookCollection.push(fn);
}

function testBlock(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    fn[META_DATA] = {
        title,
        postHook: null,
        postEachHookCollection: [],
        preHook: null,
        preEachHookCollection: [],
        fns: [],
        testCaseCollection: []
    };

    if (testBlock.caller && testBlock.caller[META_DATA]) {
        testBlock.caller[META_DATA].fns.push(fn);
    } else {
        this.processor.queue.push({
            type: TASK_TYPE.testBlock,
            fn,
            timeOut: this.timeOut,
            testingHookInterfaces: this.testingHookInterfaces
        });

        this.processor.emit(TASK_ADDED_EVENT_NAME);
    }
}

function testCase(title, fn) {
    assertTitle(title);
    assertFunction(fn);

    const caller = testCase.caller ? testCase.caller[META_DATA] : undefined;
    if (!caller) {
        this.processor.queue.push({
            type: TASK_TYPE.testCase,
            title,
            fn,
            timeOut: this.timeOut,
            testingHookInterfaces: this.testingHookInterfaces
        });

        this.processor.emit(TASK_ADDED_EVENT_NAME);
    } else {
        caller.testCaseCollection.push({
            title,
            fn
        });
    }
}

module.exports = {
    post,
    postEach,
    preEach,
    pre,
    testBlock,
    testCase
};
