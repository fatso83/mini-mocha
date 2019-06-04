const {
  isAsync,
  isCallbackFunction,
  getPromisify,
  log,
  getErrorMessage
} = require("./util");
const metaData = Symbol("metaData");

async function executeDescribe(describeBlock) {
  console.log(`\n${describeBlock.title}`);

  // Before
  if (describeBlock.beforeHook) {
    await executeHook("before", describeBlock.beforeHook);
  }

  // It blocks
  for (const ic of describeBlock.itCollection) {
    await executeItFlow(describeBlock, ic);
  }

  // After
  if (describeBlock.afterHook) {
    await executeHook("after", describeBlock.afterHook);
  }
}

async function executeItFlow(describeBlock, singleIt) {
  // beforeEach
  for (const be of describeBlock.beforeEachHookCollection) {
    await executeHook("beforeEach", be);
  }

  // it
  await executeIt(singleIt.title, singleIt.fn);

  // AfterEach
  for (const ae of describeBlock.afterEachHookCollection) {
    await executeHook("afterEach", ae);
  }
}

async function executeIt(title, fn, notLoggingSuccess) {
  try {
    if (isCallbackFunction(fn)) {
      await getPromisify(fn)();
    } else if (isAsync(fn)) {
      await fn();
    } else {
      fn();
    }
    if (!notLoggingSuccess) {
      log(title);
    }
  } catch (err) {
    log(title, getErrorMessage(err));
  }
}

async function executeHook(eachHookTitle, hook) {
  return executeIt(eachHookTitle, hook, true);
}

module.exports = {
  executeIt,
  executeDescribe,
  metaData
};
