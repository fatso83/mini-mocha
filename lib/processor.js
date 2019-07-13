const { EventEmitter } = require("events");

const { Executor } = require("./executor");

const TASK_ADDED_EVENT_NAME = "taskAdded";
const TASK_TYPE = {
    testBlock: "testBlock",
    testCase: "testCase"
};

class Processor extends EventEmitter {
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
            if (!this.isProcessing) {
                this.isProcessing = true;
                this.task();
            }
        }
    }

    async task() {
        const task = this.queue.shift();
        const { fn, type, title, timeOut } = task;

        const reporter = this.reporterClass.getReporter();
        const executor = Executor.getExecutor(reporter, timeOut);

        try {
            type === TASK_TYPE.testCase ? await executor.testCase(title, fn) : await executor.testBlock(fn);
            this.isProcessing = false;
            reporter.flush();
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
