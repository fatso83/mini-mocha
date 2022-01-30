const assert = require("assert");
process.env["MINI_MOCHA_IGNORE_FAILURE"] = "true";

const { getSnapshotContent, runTest } = require("./helper");
["tdd", "bdd"].forEach(testInterface => {
    runTest(`/test_case/${testInterface}/test_1.js`, `snapshot/${testInterface}/test_1.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_1.txt`));
    });

    runTest(`/test_case/${testInterface}/test_2.js`, `snapshot/${testInterface}/test_2.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_2.txt`));
    });

    runTest(`/test_case/${testInterface}/test_3.js`, `snapshot/${testInterface}/test_3.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_3.txt`));
    });

    runTest(`/test_case/${testInterface}/test_4.js`, `snapshot/${testInterface}/test_4.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_4.txt`));
    });

    runTest(`/test_case/${testInterface}/test_5.js`, `snapshot/${testInterface}/test_5.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_5.txt`));
    });

    runTest(`/test_case/${testInterface}/test_6.js`, `snapshot/${testInterface}/test_6.txt`, (err, op) => {
        if (err) {
            throw err;
        }
        const regex = /[\n\t\s\+']/g;
        assert.strictEqual(
            getSnapshotContent(`snapshot/${testInterface}/test_6.txt`).replace(regex, ""),
            op.replace(regex, "")
        );
    });

    runTest(`/test_case/${testInterface}/test_7.js`, `snapshot/${testInterface}/test_7.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_7.txt`));
    });

    runTest(`/test_case/${testInterface}/test_8.js`, `snapshot/${testInterface}/test_8.txt`, (err, op) => {
        if (err) {
            throw err;
        }

        assert.strictEqual(op, getSnapshotContent(`snapshot/${testInterface}/test_8.txt`));
    });
});
