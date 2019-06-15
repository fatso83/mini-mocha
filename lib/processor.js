const { EventEmitter } = require("events");

const { Execute } = require("./execute");

const taskAddedEventName = "taskAdded";
const taskType = {
    describe: "describe",
    it: "it"
};

class Processor extends EventEmitter {
    constructor(reporterClass) {
        super();
        this.reporterClass = reporterClass;

        this.taskQueue = [];
        this.isProcessing = false;

        this.on(taskAddedEventName, () => this.processQueue());
    }

    static getInstance(reporterClass) {
        return new Queue(reporterClass);
    }

    queue() {
        if (taskQueue.length) {
            if (!this.isProcessing) {
                this.isProcessing = true;
                this.task();
            }
        }
    }

    task() {
        const task = this.taskQueue.shift();
        const { fn, type, title } = task;

        const reporter = this.reporterClass.getReporter();
        const execute = Execute.getInstance(reporter);
        const exec = type === taskType.it ? execute.it(title, fn) : execute.describe(fn);

        try {
            await exec;
            this.isProcessing = false;
            reporter.flush();
            this.queue();
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

module.exports = {
    Processor,
    taskAddedEventName,
    taskType
};
