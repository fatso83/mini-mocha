const { ValueViewerSymbol } = require("@runkit/value-viewer");

const defaultReporter = {
    log: function log(title, errorMessage, titleOnly) {
        if (titleOnly) {
            console.log(title);
        } else {
            console.log(defaultReporter.getDisplayText(title, errorMessage));
        }
    },
    getDisplayText: function getDisplayText(title, errorMessage) {
        const status = errorMessage ? `❌` : "✔️ ";

        return `${status} ${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`;
    }
};

const runKitReporter = {
    log: function log(title, errorMessage, titleOnly) {
        let message;
        if (!titleOnly) {
            message = errorMessage
                ? runKitReporter.errorTitle(`${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`)
                : runKitReporter.successTitle(title);
        } else {
            message = `<p style="${runKitReporter.getStyle("#005cd6")}">${title.replace(/\n/g, "<br/>")}</p>`;
        }
        console.log(message);
        console.log({
            [ValueViewerSymbol]: { title: title.replace(/\n/g, ""), HTML: message }
        });
    },
    errorTitle: function errorTitle(errorMessage) {
        return `<p style="${getStyle("#00d6b2")}">✓ ${errorMessage.replace(/\n/g, "<br/>")}</p>`;
    },

    successTitle: function successTitle(title) {
        return `<p style="${getStyle("#c00")}">✖ ${title.replace(/\n/g, "<br/>")}</p>`;
    },

    getStyle: function getStyle(color) {
        return `color: ${color};font-size: 12px;display: block;float: left;`;
    }
};

module.exports = {
    defaultReporter,
    runKitReporter
};
