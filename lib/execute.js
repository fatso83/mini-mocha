const { isAsync, isCallbackFunction, getPromisify, getErrorMessage } = require("./util");
const metaData = Symbol("metaData");

async function executeDescribe(fn, reporter) {
    await executeFn(fn);
    const metaDataSection = fn[metaData];
    reporter.log(metaDataSection.title, null, true);

    // Before
    if (metaDataSection.beforeHook) {
        await executeHook("before", metaDataSection.beforeHook, reporter);
    }

    // It blocks
    for (const singleIt of metaDataSection.itCollection) {
        // BeforeEach
        for (const be of metaDataSection.beforeEachHookCollection) {
            await executeHook("beforeEach", be, reporter);
        }

        // It
        await executeIt(singleIt.title, singleIt.fn, reporter);

        // AfterEach
        for (const ae of metaDataSection.afterEachHookCollection) {
            await executeHook("afterEach", ae, reporter);
        }
    }

    // describe
    if (metaDataSection.fns.length) {
        for (const otherDescribe of metaDataSection.fns) {
            await executeDescribe(otherDescribe, reporter);
        }
    }

    if (metaDataSection.afterHook) {
        await executeHook("after", metaDataSection.afterHook, reporter);
    }
}

async function executeIt(title, fn, reporter) {
    try {
        await executeFn(fn);
        reporter.log(title);
    } catch (err) {
        reporter.log(title, getErrorMessage(err));
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

async function executeHook(eachHookTitle, hook, reporter) {
    try {
        await executeFn(hook);
    } catch (err) {
        reporter.log(eachHookTitle, getErrorMessage(err));
    }
}

module.exports = {
    executeIt,
    executeDescribe,
    executeFn,
    metaData
};
