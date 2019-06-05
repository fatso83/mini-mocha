const { isAsync, isCallbackFunction, getPromisify, getErrorMessage } = require("./util");
const metaData = Symbol("metaData");

async function executeDescribe(describeBlock, reporter) {
    reporter.log(`\n${describeBlock.title}`, null, true);

    // Before
    if (describeBlock.beforeHook) {
        await executeHook("before", describeBlock.beforeHook, reporter);
    }

    // It blocks
    for (const ic of describeBlock.itCollection) {
        await executeItFlow(describeBlock, ic, reporter);
    }

    // After
    if (describeBlock.afterHook) {
        await executeHook("after", describeBlock.afterHook, reporter);
    }
}

async function executeItFlow(describeBlock, singleIt, reporter) {
    // beforeEach
    for (const be of describeBlock.beforeEachHookCollection) {
        await executeHook("beforeEach", be, reporter);
    }

    // it
    await executeIt(singleIt.title, singleIt.fn, reporter);

    // AfterEach
    for (const ae of describeBlock.afterEachHookCollection) {
        await executeHook("afterEach", ae, reporter);
    }
}

async function executeIt(title, fn, reporter, notLoggingSuccess) {
    try {
        if (isCallbackFunction(fn)) {
            await getPromisify(fn)();
        } else if (isAsync(fn)) {
            await fn();
        } else {
            fn();
        }
        if (!notLoggingSuccess) {
            reporter.log(title);
        }
    } catch (err) {
        reporter.log(title, getErrorMessage(err));
    }
}

async function executeHook(eachHookTitle, hook, reporter) {
    return executeIt(eachHookTitle, hook, reporter, true);
}

module.exports = {
    executeIt,
    executeDescribe,
    metaData
};
