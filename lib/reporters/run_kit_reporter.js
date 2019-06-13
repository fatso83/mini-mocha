const { ValueViewerSymbol } = require("@runkit/value-viewer");

class RunKitReporter {
    constructor() {
        this.logs = [];
    }

    static getReporter() {
        return new RunKitReporter();
    }

    log(title, errorMessage, titleOnly) {
        let message;
        if (!titleOnly) {
            message = this.errorMessage
                ? this.errorTitle(`${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`)
                : this.successTitle(title);
        } else {
            message = `<p style="${this.getStyle("#005cd6")}">${title.replace(/\n/g, "<br/>")}</p>`;
        }

        this.logs.push({
            [ValueViewerSymbol]: { title: title.replace(/\n/g, ""), HTML: message }
        });
    }

    errorTitle(errorMessage) {
        return `<p style="${this.getStyle("#c00")}">✖ ${errorMessage.replace(/\n/g, "<br/>")}</p>`;
    }

    successTitle(title) {
        return `<p style="${this.getStyle("#00d6b2")}">✓ ${title.replace(/\n/g, "<br/>")}</p>`;
    }

    getStyle(color) {
        return `color: ${color};font-size: 12px;display: block;float: left;`;
    }

    flush() {
        // we collect them and flush
        for (const singleLog of this.logs) {
            console.log(singleLog);
        }
    }
}

module.exports = { RunKitReporter };
