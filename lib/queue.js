const events = require("events");

const { executeIt, executeDescribe, metaData, executeFn } = require("./execute");

const taskAddedEventName = "taskAdded";
const taskType = {
    describe: "describe",
    it: "it"
};
const taskQueue = [];

let isProcessing = false;

const queueHandler = new events.EventEmitter();
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

    const exec = type === taskType.it ? executeIt(title, fn) : executeDescribe(fn);

    exec.then(() => (isProcessing = false))
        .then(() => processQueue())
        .catch(error => {
            console.log(error);
            process.exit(1);
        });
}

module.exports = {
    queueHandler,
    taskAddedEventName,
    taskQueue,
    taskType
};
