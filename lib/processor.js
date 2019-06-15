const { EventEmitter } = require("events");

const { Execute } = require("./execute");

const TASK_ADDED_EVENT_NAME = "taskAdded";
const TASK_TYPE = {
    describe: "describe",
    it: "it"
};

class Processor extends EventEmitter {
    constructor(reporterClass) {
        super();
        this.reporterClass = reporterClass;

        this.queue = [];
        this.isProcessing = false;

        this.on(TASK_ADDED_EVENT_NAME, () => this.process());
    }

    static getInstance(reporterClass) {
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
        const { fn, type, title } = task;

        const reporter = this.reporterClass.getReporter();
        const execute = Execute.getInstance(reporter);
        const exec = type === TASK_TYPE.it ? execute.it(title, fn) : execute.describe(fn);

        try {
            await exec;
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
