const events = require("events");

const { executeIt, executeDescribe } = require("./execute");

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
    const exec = type === taskType.it ? executeIt(title, fn, reporter) : executeDescribe(fn, reporter);

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
