const assert = require("assert");
const { promisify } = require("util");

function log(title, errMessage = "") {
  const status = errMessage ? `❌` : "✔️ ";

  console.log(
    `${status} ${title}${errMessage && ` (Failed with: "${errMessage}")`}`
  );
}

function isAsync(fn) {
  return !!(fn.constructor && fn.constructor.name === "AsyncFunction");
}

function assertFunction(fn) {
  assert(typeof fn === "function", "missing function");
}

function assertTitle(title) {
  assert(typeof title === "string", "title required");
}

function isCallbackFunction(fn) {
  return fn && fn.length === 1;
}

function getPromisify(fn) {
  return promisify(fn);
}

function getErrorMessage(error) {
  if (error && error.message) {
    return error.message;
  }

  return error;
}

module.exports = {
  assertFunction,
  assertTitle,
  log,
  isAsync,
  isCallbackFunction,
  getPromisify,
  getErrorMessage
};
