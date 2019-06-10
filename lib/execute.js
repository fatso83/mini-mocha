const { isAsync, isCallbackFunction, getPromisify, log, getErrorMessage } = require("./util");
const metaData = Symbol("metaData");

async function executeDescribe(fn) {
    await executeFn(fn);
    const metaDataSection = fn[metaData];
    console.log(metaDataSection.title);

    // Before
    if (metaDataSection.beforeHook) {
        await executeHook("before", metaDataSection.beforeHook);
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
            await innerExecutor(
                otherDescribe,
                metaDataSection.beforeEachHookCollection,
                metaDataSection.afterEachHookCollection
            );
        }
    }

    // After
    if (metaDataSection.afterHook) {
        await executeHook("after", metaDataSection.afterHook);
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

// This is to handle nested Describe blocks recursively
async function innerExecutor(otherDescribe, beforeEach = [], afterEach = [], itBlocks = [], afterHooks = []) {
    await executeFn(otherDescribe);
    const metaDataSection = otherDescribe[metaData];
    console.log(metaDataSection.title);

    // Before
    if (metaDataSection.beforeHook) {
        await executeHook("before", metaDataSection.beforeHook);
    }

    if (metaDataSection.itCollection.length) {
        itBlocks = [...itBlocks, ...metaDataSection.itCollection];
    }

    if (metaDataSection.afterHook) {
        afterHooks = [...afterHooks, metaDataSection.afterHook];
    }

    beforeEach = [...beforeEach, ...metaDataSection.beforeEachHookCollection];
    afterEach = [...metaDataSection.afterEachHookCollection, ...afterEach];

    if (metaDataSection.fns.length) {
        for (const innerDesc of metaDataSection.fns) {
            await innerExecutor(
                innerDesc,
                [...beforeEach, ...innerDesc[metaData].beforeEachHookCollection],
                [...innerDesc[metaData].afterEachHookCollection, ...afterEach],
                [...itBlocks, ...innerDesc[metaData].itCollection]
            );
        }
    } else {
        // It blocks
        for (const singleIt of itBlocks) {
            // BeforeEach
            for (const be of beforeEach) {
                await executeHook("beforeEach", be);
            }

            await executeIt(singleIt.title, singleIt.fn);

            // AfterEach
            for (const ae of afterEach) {
                await executeHook("afterEach", ae);
            }
        }

        // After Hooks
        for (const ae of afterHooks) {
            await executeHook("after", ae);
        }
    }
}

module.exports = {
    executeIt,
    executeDescribe,
    executeFn,
    metaData
};
