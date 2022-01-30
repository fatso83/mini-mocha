const debug = require("debug")("processor");
const { EventEmitter } = require("events");

const { Executor } = require("./executor");

const TASK_ADDED_EVENT_NAME = "taskAdded";
const TASK_TYPE = {
    testBlock: "testBlock",
    testCase: "testCase"
};

class Processor extends EventEmitter {
    totalFailures = 0;
    totalPasses = 0;

    constructor(reporterClass) {
        super();
        this.reporterClass = reporterClass;

        this.queue = [];
        this.isProcessing = false;

        this.on(TASK_ADDED_EVENT_NAME, () => this.process());
    }

    static getProcessor(reporterClass) {
        return new Processor(reporterClass);
    }

    process() {
        if (this.queue.length) {
            debug(`Processing queue (${this.queue.length} elements remaining)`);
            if (!this.isProcessing) {
                this.isProcessing = true;
                this.pickNextTaskForProcessing();
            }
        } else {
            debug("No more tasks in processor queue");
            debug(`${this.totalFailures} failures out of ${this.totalFailures + this.totalPasses} testcases`);

            // needs to be checked at this point, not at start, as test scripts can alter the value after startup
            const testMode = !!process.env["MINI_MOCHA_IGNORE_FAILURE"];
            if (!testMode && this.totalFailures > 0) {
                debug("Exiting with non-zero value. Not test mode");
                process.exit(1);
            }
        }
    }

    async pickNextTaskForProcessing() {
        const task = this.queue.shift();
        const { fn, type, title, timeOut, testingHookInterfaces } = task;

        const reporter = this.reporterClass.getReporter();
        const executor = Executor.getExecutor(reporter, timeOut, testingHookInterfaces);

        try {
            type === TASK_TYPE.testCase ? await executor.testCase(title, fn) : await executor.testBlock(fn);
            this.totalPasses += executor.passes;
            this.totalFailures += executor.failures;
            this.isProcessing = false;
            reporter.flush();

            // restarts the loop (tail recursion)
            this.process();
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

module.exports = {
    Processor,
    TASK_ADDED_EVENT_NAME,
    TASK_TYPE
};
