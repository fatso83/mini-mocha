const events = require('events');

const { isAsync, isCallbackFunction, getPromisify } = require('./util');
const { executeIt, executeDescribe, metaData } = require('./execute');

const taskAddedEventName = 'taskAdded';
const taskType = {
  describe: 'describe',
  it: 'it'
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
    exec = executeIt(title, fn);
  } else {
    if (isCallbackFunction(fn)) {
      exec = getPromisify(fn)().then((t) => {
        console.log(t);
        executeDescribe(fn[metaData])
      });
    } else if (isAsync(fn)) {
      exec = fn.then(() => executeDescribe(fn[metaData]));
    } else {
      fn();
      exec = executeDescribe(fn[metaData]);
    }
  }

  exec
    .then(() => (isProcessing = false))
    .then(() => processQueue())
    .catch(() => process.exit(1));
}

module.exports = {
  queueHandler,
  taskAddedEventName,
  taskQueue,
  taskType
};
