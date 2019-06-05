function getDisplayText(title, errorMessage ="") {
    const status = errorMessage ? `❌` : "✔️ ";

    return `${status} ${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`;
}

function log(title, errorMessage ="", titleOnly) {
    if (!titleOnly) {
        console.log(getDisplayText(title, errorMessage));
    } else {
        console.log(title);
    }
}

module.exports.defaultReporter = { log };
