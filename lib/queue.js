const events = require("events");

const { Execute } = require("./execute");

const taskAddedEventName = "taskAdded";
const taskType = {
    describe: "describe",
    it: "it"
};
const taskQueue = [];

let isProcessing = false;

const queueHandler = new events.EventEmitter();
queueHandler.reporter = null;
queueHandler.on(taskAddedEventName, () => processQueue());

function processQueue() {
    if (taskQueue.length) {
        if (!isProcessing) {
            isProcessing = true;
            processTask();
        }
    }
}

async function processTask() {
    const task = taskQueue.shift();
    const { fn, type, title } = task;

    const reporter = queueHandler.reporter.getReporter();
    const execute = Execute.getInstance(reporter);
    const exec = type === taskType.it ? execute.it(title, fn) : execute.describe(fn);

    exec.then(() => (isProcessing = false))
        .then(() => reporter.flush())
        .then(() => processQueue())
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

module.exports = {
    queueHandler,
    taskAddedEventName,
    taskQueue,
    taskType
};
