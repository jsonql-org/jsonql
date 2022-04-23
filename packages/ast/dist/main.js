"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = exports.tsClassParser = exports.tsFunctionParser = exports.jsParser = void 0;
const tslib_1 = require("tslib");
// ast index export
const swc_parser_base_1 = require("./swc-parser-base");
const processors_1 = require("./processors");
const constants_1 = require("./constants");
function jsParser(infile) {
    console.log(`@TODO`, infile);
    // "ecmascript" |
}
exports.jsParser = jsParser;
/** deal with the function style resolver */
function tsFunctionParser(infile) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const parser = getParser('ts');
        return parser(infile)
            .then(processors_1.processFunctionModuleBody)
            .then(processors_1.normalize)
            .then(processors_1.processArgParams);
    });
}
exports.tsFunctionParser = tsFunctionParser;
/** parse ts file */
function tsClassParser(infile) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (constants_1.IS_DEBUG) {
            console.time('ast');
        }
        const parser = getParser('ts');
        return parser(infile)
            .then(processors_1.processClassModuleBody)
            .then(processors_1.normalize)
            .then(processors_1.processArgs)
            .then(result => {
            if (constants_1.IS_DEBUG) {
                console.timeEnd('ast');
            }
            return result;
        });
    });
}
exports.tsClassParser = tsClassParser;
/** preconfig */
function getParser(syntax) {
    if (!constants_1.SYNTAXS[syntax]) {
        throw new Error(`Unsupported syntax! Only allow ts or js`);
    }
    const options = {
        syntax: constants_1.SYNTAXS[syntax],
        comments: false,
        script: true,
        target: "es5",
        decorators: true,
        // Input source code are treated as module by default
        // isModule: true,
    };
    return function (infile) {
        return (0, swc_parser_base_1.swcParserBase)(infile, options);
    };
}
exports.getParser = getParser;
