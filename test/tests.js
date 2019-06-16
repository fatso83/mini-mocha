const assert = require("assert");

const { getSnapshotContent, runTest } = require("./helper");

runTest("test_case/test_1.js", "snapshot/test_1.txt", (err, op) => {
    if (err) {
        throw err;
    }

    assert.strictEqual(op, getSnapshotContent("snapshot/test_1.txt"));
});

runTest("test_case/test_2.js", "snapshot/test_2.txt", (err, op) => {
    if (err) {
        throw err;
    }

    assert.strictEqual(op, getSnapshotContent("snapshot/test_2.txt"));
});

runTest("test_case/test_3.js", "snapshot/test_3.txt", (err, op) => {
    if (err) {
        throw err;
    }

    assert.strictEqual(op, getSnapshotContent("snapshot/test_3.txt"));
});

runTest("test_case/test_4.js", "snapshot/test_4.txt", (err, op) => {
    if (err) {
        throw err;
    }

    assert.strictEqual(op, getSnapshotContent("snapshot/test_4.txt"));
});

runTest("test_case/test_5.js", "snapshot/test_5.txt", (err, op) => {
    if (err) {
        throw err;
    }

    assert.strictEqual(op, getSnapshotContent("snapshot/test_5.txt"));
});

runTest("test_case/test_6.js", "snapshot/test_6.txt", (err, op) => {
    if (err) {
        throw err;
    }
    const regex = /[\n\t\s\+']/g;
    assert.strictEqual(getSnapshotContent("snapshot/test_6.txt").replace(regex, ""), op.replace(regex, ""));
});
