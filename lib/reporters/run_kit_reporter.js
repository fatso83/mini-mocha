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
            message = errorMessage
                ? this.errorTitle(`${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`)
                : this.successTitle(title);
        } else {
            message = `<p style="${this.getStyle("#005cd6")}">${title.replace(/\n/g, "<br/>")}</p>`;
        }

        this.logs.push({ title: title.replace(/\n/g, ""), message });
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
        if (this.logs.length) {
            // we collect them and flush
            const first = this.logs[0];
            const messages = this.logs.map(singleLog => `<tr><td>${singleLog.message}</td></tr>`);
            const html = `<table><thead>${first.title}</thead>${messages.join("")}</table>`;

            console.log({
                [ValueViewerSymbol]: { title: first.title.replace(/\n/g, ""), HTML: html }
            });

            this.logs = [];
        }
    }
}

module.exports = { RunKitReporter };
