"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParser = exports.tsClassParser = exports.tsFunctionParser = exports.tsFileParserSync = exports.tsFileParser = exports.tsClassParserSync = exports.tsBasicParserSync = void 0;
const tslib_1 = require("tslib");
// ast index export
const swc_parser_base_1 = require("./lib/swc-parser-base");
const processors_1 = require("./lib/processors");
const common_1 = require("./lib/common");
const constants_1 = require("./lib/constants");
/** just the core parser sync version */
function tsBasicParserSync(filePath) {
    const options = (0, common_1.getOptions)('ts');
    return (0, swc_parser_base_1.swcParserSync)(filePath, options);
}
exports.tsBasicParserSync = tsBasicParserSync;
/** parse ts file sync */
function tsClassParserSync(infile) {
    const step1 = tsBasicParserSync(infile);
    // @ts-ignore another non-sense from Typscript - it runs but won't compiled
    const step2 = (0, processors_1.processClassModuleBody)(step1, false);
    const step3 = (0, processors_1.normalize)(step2);
    const step4 = (0, processors_1.processArgs)(step3);
    return step4;
}
exports.tsClassParserSync = tsClassParserSync;
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
    const options = (0, common_1.getOptions)('ts');
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
    const options = (0, common_1.getOptions)(syntax);
    return function (infile) {
        return file ? (0, swc_parser_base_1.swcParseFileBase)(infile, options)
            : (0, swc_parser_base_1.swcParserBase)(infile, options);
    };
}
exports.getParser = getParser;
