const { isAsync, isCallbackFunction, getPromisify, getErrorMessage } = require("./util");
const META_DATA = Symbol("metaData");

class Executor {
    constructor(reporter, timeOut, interface) {
        this.reporter = reporter;
        this.timeOut = timeOut;
        this.interface = interface;
    }

    static getExecutor(reporter, timeOut) {
        return new Executor(reporter, timeOut);
    }

    async testBlock(fn) {
        await this.run(fn);

        const metaDataSection = fn[META_DATA];

        this.reporter.log(metaDataSection.title, null, true);

        // Before
        if (metaDataSection.preHook) {
            await this.hook(interface.pre, metaDataSection.preHook);
        }

        // It blocks
        for (const singleTestCase of metaDataSection.testCaseCollection) {
            // BeforeEach
            for (const be of metaDataSection.preEachHookCollection) {
                await this.hook(interface.preEach, be);
            }

            // It
            await this.testCase(singleTestCase.title, singleTestCase.fn);

            // AfterEach
            for (const ae of metaDataSection.postEachHookCollection) {
                await this.hook(interface.postEach, ae);
            }
        }

        // testBlock
        if (metaDataSection.fns.length) {
            for (const otherDescribe of metaDataSection.fns) {
                await this.testBlock(otherDescribe);
            }
        }

        if (metaDataSection.postHook) {
            await this.hook(interface.post, metaDataSection.postHook);
        }
    }

    async testCase(title, fn) {
        try {
            await this.run(fn);
            this.reporter.log(title);
        } catch (err) {
            this.reporter.log(title, getErrorMessage(err));
        }
    }

    async run(fn) {
        return Promise.race([this.runFn(fn), this.timeOutTrigger(this.timeOut)]);
    }

    timeOutTrigger(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() =>
                reject(new Error(`Error: Timeout of ${value}ms exceeded`)),
            value);
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
