const { ValueViewerSymbol } = require("@runkit/value-viewer");

function log(title, errorMessage, titleOnly) {
    let message;
    if (!titleOnly) {
        message = errorMessage
            ? errorTitle(`${title}${errorMessage && ` (Failed with: "${errorMessage}")`}`)
            : successTitle(title);
    } else {
        message = `<p style="${getStyle("#005cd6")}">${title.replace(/\n/g, "<br/>")}</p>`;
    }

    console.log({
        [ValueViewerSymbol]: { title: title.replace(/\n/g, ""), HTML: message }
    });
}

function errorTitle(errorMessage) {
    return `<p style="${getStyle("#00d6b2")}">✓ ${errorMessage.replace(/\n/g, "<br/>")}</p>`;
}

function successTitle(title) {
    return `<p style="${getStyle("#c00")}">✖ ${title.replace(/\n/g, "<br/>")}</p>`;
}

function getStyle(color) {
    return `color: ${color};font-size: 12px;display: block;float: left;`;
}

module.exports.runKitReporter = { log };
