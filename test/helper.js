const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function runTest(fixturePath, snapshotPath, op) {
  exec(
    `node ${path.resolve(path.join(__dirname, fixturePath))}`,
    (error, stdout, stderr) => {
      if (error || stderr) {
        return op(error || stderr);
      }
      if (!fs.existsSync(path.join(__dirname, snapshotPath))) {
        fs.writeFileSync(
          path.join(__dirname, snapshotPath),
          stdout
        );
      }

      return op(null, stdout);
    }
  );
}

function getSnapshotContent(snapshotPath) {
  return fs.readFileSync(path.resolve(path.join(__dirname, snapshotPath))).toString();
}

module.exports = {
  getSnapshotContent,
  runTest
};
