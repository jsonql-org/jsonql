"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swcParserSync = exports.swcParserAsync = void 0;
// instead of export those core methods striaght from the lib
// we create couple exports here just for other development
// this will not include in the default exports so we need to get it like
// @jsonql/ast/parsers
const swc_parser_base_1 = require("./lib/swc-parser-base");
const common_1 = require("./lib/common");
/* the parser async version */
function swcParserAsync(pathToFile, options = {}, type = 'ts') {
    const defaultOptions = (0, common_1.getOptions)(type);
    return (0, swc_parser_base_1.swcParserBase)(pathToFile, Object.assign({}, defaultOptions, options));
}
exports.swcParserAsync = swcParserAsync;
/* the parser sync version */
function swcParserSync(pathToFile, options = {}, type = 'ts') {
    const defaultOptions = (0, common_1.getOptions)(type);
    return (0, swc_parser_base_1.swcParserSync)(pathToFile, Object.assign({}, defaultOptions, options));
}
exports.swcParserSync = swcParserSync;
