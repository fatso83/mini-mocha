const assert = require("assert");
const { promisify } = require("util");

function isAsync(fn) {
    return !!(fn.constructor && fn.constructor.name === "AsyncFunction");
}

function assertFunction(fn) {
    assert(typeof fn === "function", "missing function");
}

function assertTitle(title) {
    assert(typeof title === "string", "title required");
}

function assertNumber(number) {
    assert(typeof number === "number", "given value is not a number");
    assert(number > 0, "given value is not a positive number");
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
    isAsync,
    isCallbackFunction,
    getPromisify,
    getErrorMessage,
    assertNumber
};
