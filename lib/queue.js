const events = require("events");

const { isAsync, isCallbackFunction, getPromisify } = require("./util");
const { executeIt, executeDescribe, metaData } = require("./execute");

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

    let exec = null;
    if (type === taskType.it) {
        exec = executeIt(title, fn, queueHandler.reporter);
    } else {
        if (isCallbackFunction(fn)) {
            exec = getPromisify(fn)().then(t => {
                executeDescribe(fn[metaData], queueHandler.reporter);
            });
        } else if (isAsync(fn)) {
            exec = fn.then(() => executeDescribe(fn[metaData], queueHandler.reporter));
        } else {
            fn();
            exec = executeDescribe(fn[metaData], queueHandler.reporter);
        }
    }

    try {
        await exec;
        isProcessing = false;
        processQueue();
    } catch (err) {
        process.exit(1);
    }
}

module.exports = {
    queueHandler,
    taskAddedEventName,
    taskQueue,
    taskType
};
