const { isAsync, isCallbackFunction, getPromisify, getErrorMessage } = require("./util");
const metaData = Symbol("metaData");

class Execute {
    constructor(reporter) {
        this.reporter = reporter;
    }

    static getInstance(reporter) {
        return new Execute(reporter);
    }

    async describe(fn) {
        await this.executeFn(fn);
        const metaDataSection = fn[metaData];
        this.reporter.log(metaDataSection.title, null, true);

        // Before
        if (metaDataSection.beforeHook) {
            await this.executeHook("before", metaDataSection.beforeHook);
        }

        // It blocks
        for (const singleIt of metaDataSection.itCollection) {
            // BeforeEach
            for (const be of metaDataSection.beforeEachHookCollection) {
                await this.executeHook("beforeEach", be);
            }

            // It
            await this.it(singleIt.title, singleIt.fn);

            // AfterEach
            for (const ae of metaDataSection.afterEachHookCollection) {
                await this.executeHook("afterEach", ae);
            }
        }

        // describe
        if (metaDataSection.fns.length) {
            for (const otherDescribe of metaDataSection.fns) {
                await this.describe(otherDescribe);
            }
        }

        if (metaDataSection.afterHook) {
            await this.executeHook("after", metaDataSection.afterHook);
        }
    }

    async it(title, fn) {
        try {
            await this.executeFn(fn);
            this.reporter.log(title);
        } catch (err) {
            this.reporter.log(title, getErrorMessage(err));
        }
    }

    async executeFn(fn) {
        if (isCallbackFunction(fn)) {
            await getPromisify(fn)();
        } else if (isAsync(fn)) {
            await fn();
        } else {
            fn();
        }
    }

    async executeHook(eachHookTitle, hook) {
        try {
            await this.executeFn(hook);
        } catch (err) {
            this.reporter.log(eachHookTitle, getErrorMessage(err));
        }
    }
}

module.exports = {
    Execute,
    metaData
};
