const { isAsync, isCallbackFunction, getPromisify, log, getErrorMessage } = require("./util");
const metaData = Symbol("metaData");

async function executeDescribe(fn, afterHooks = []) {
    await executeFn(fn);
    const metaDataSection = fn[metaData];
    log(metaDataSection.title, null, true);

    // Before
    if (metaDataSection.beforeHook) {
        await executeHook("before", metaDataSection.beforeHook);
    }

    if (metaDataSection.afterHook) {
        afterHooks = [metaDataSection.afterHook, ...afterHooks];
    }

    // It blocks
    for (const singleIt of metaDataSection.itCollection) {
        // BeforeEach
        for (const be of metaDataSection.beforeEachHookCollection) {
            await executeHook("beforeEach", be);
        }

        // It
        await executeIt(singleIt.title, singleIt.fn);

        // AfterEach
        for (const ae of metaDataSection.afterEachHookCollection) {
            await executeHook("afterEach", ae);
        }
    }

    // describe
    if (metaDataSection.fns.length) {
        for (const otherDescribe of metaDataSection.fns) {
            await executeDescribe(otherDescribe, afterHooks);
        }
    } else {
        // After
        for (const a of afterHooks) {
            await executeHook("after", a);
        }
    }
}

async function executeIt(title, fn, notLoggingSuccess) {
    try {
        await executeFn(fn);
        if (!notLoggingSuccess) {
            log(title);
        }
    } catch (err) {
        log(title, getErrorMessage(err));
    }
}

async function executeFn(fn) {
    if (isCallbackFunction(fn)) {
        await getPromisify(fn)();
    } else if (isAsync(fn)) {
        await fn();
    } else {
        fn();
    }
}

async function executeHook(eachHookTitle, hook) {
    return executeIt(eachHookTitle, hook, true);
}

module.exports = {
    executeIt,
    executeDescribe,
    executeFn,
    metaData
};
