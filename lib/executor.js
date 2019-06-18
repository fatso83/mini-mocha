const { isAsync, isCallbackFunction, getPromisify, getErrorMessage } = require("./util");
const META_DATA = Symbol("metaData");

class Executor {
    constructor(reporter) {
        this.reporter = reporter;
    }

    static getExecutor(reporter) {
        return new Executor(reporter);
    }

    async describe(fn) {
        await this.run(fn);

        const metaDataSection = fn[META_DATA];

        this.reporter.log(metaDataSection.title, null, true);

        // Before
        if (metaDataSection.beforeHook) {
            await this.hook("before", metaDataSection.beforeHook);
        }

        // It blocks
        for (const singleIt of metaDataSection.itCollection) {
            // BeforeEach
            for (const be of metaDataSection.beforeEachHookCollection) {
                await this.hook("beforeEach", be);
            }

            // It
            await this.it(singleIt.title, singleIt.fn);

            // AfterEach
            for (const ae of metaDataSection.afterEachHookCollection) {
                await this.hook("afterEach", ae);
            }
        }

        // describe
        if (metaDataSection.fns.length) {
            for (const otherDescribe of metaDataSection.fns) {
                await this.describe(otherDescribe);
            }
        }

        if (metaDataSection.afterHook) {
            await this.hook("after", metaDataSection.afterHook);
        }
    }

    async it(title, fn) {
        try {
            await this.run(fn);
            this.reporter.log(title);
        } catch (err) {
            this.reporter.log(title, getErrorMessage(err));
        }
    }

    async run(fn) {
        return Promise.race([this.runFn(fn), this.timeOut(fn.timeOut)]);
    }

    timeOut(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`Error: Timeout of ${value}ms exceeded`));
            }, value);
        });
    }

    async runFn(fn) {
        if (isCallbackFunction(fn)) {
            await getPromisify(fn)();
        } else if (isAsync(fn)) {
            await fn();
        } else {
            fn();
        }
    }

    async hook(eachHookTitle, hook) {
        try {
            await this.run(hook);
        } catch (err) {
            this.reporter.log(eachHookTitle, getErrorMessage(err));
        }
    }
}

module.exports = {
    Executor,
    META_DATA
};
