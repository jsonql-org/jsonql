"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = exports.tsClassParser = exports.tsFunctionParser = exports.tsFileParserSync = exports.tsFileParser = exports.tsBasicParserSync = void 0;
const tslib_1 = require("tslib");
// ast index export
const swc_parser_base_1 = require("./lib/swc-parser-base");
const processors_1 = require("./lib/processors");
const constants_1 = require("./lib/constants");
/** just the core parser sync version */
function tsBasicParserSync(filePath) {
    const options = getOptions('ts');
    return (0, swc_parser_base_1.swcParserSync)(filePath, options);
}
exports.tsBasicParserSync = tsBasicParserSync;
/** This will pass the code directly for parsing */
function tsFileParser(code) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const parser = getParser('ts', true);
        return parser(code)
            .then(module => module.body)
            .then(processors_1.normalize)
            .then(processors_1.processArgParams);
    });
}
exports.tsFileParser = tsFileParser;
/** The string version for individual function */
function tsFileParserSync(code) {
    const options = getOptions('ts');
    return (0, swc_parser_base_1.swcParseFileSync)(code, options);
}
exports.tsFileParserSync = tsFileParserSync;
/** deal with the function style resolver */
function tsFunctionParser(infile) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (constants_1.IS_DEBUG) {
            console.time('ast');
        }
        const parser = getParser('ts');
        return parser(infile)
            .then(processors_1.processFunctionModuleBody)
            .then(processors_1.normalize)
            .then(processors_1.processArgParams)
            .then(result => {
            if (constants_1.IS_DEBUG) {
                console.timeEnd('ast');
            }
            return result;
        });
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
function getParser(syntax, file = false) {
    const options = getOptions(syntax);
    return function (infile) {
        return file ? (0, swc_parser_base_1.swcParseFileBase)(infile, options)
            : (0, swc_parser_base_1.swcParserBase)(infile, options);
    };
}
exports.getParser = getParser;
/** wrapper to get the options  */
function getOptions(syntax) {
    if (!constants_1.SYNTAXS[syntax]) {
        throw new Error(`Unsupported syntax! Only allow ts or js`);
    }
    return {
        syntax: constants_1.SYNTAXS[syntax],
        comments: false,
        script: true,
        target: "es5",
        decorators: true,
        // Input source code are treated as module by default
        // isModule: true,
    };
}
