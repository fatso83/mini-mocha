class DefaultReporter {
    constructor() {}

    static getReporter() {
        return new DefaultReporter();
    }

    log(title, errMessage = "", justTitle = false) {
        const status = errMessage ? `❌` : "✔️ ";

        if (justTitle) {
            console.log(title);
        } else {
            console.log(`${status} ${title}${errMessage && ` (Failed with: "${errMessage}")`}`);
        }
    }

    flush() {
        // In default reporter, we don't have to collect and flush
        // We dump them as execution happens
    }
}

module.exports = { DefaultReporter };
