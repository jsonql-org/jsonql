"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsFileParser = exports.jsParser = void 0;
const swc_parser_base_1 = require("./lib/swc-parser-base");
const common_1 = require("./lib/common");
/** parse js file sync version */
function jsParser(infile) {
    const opts = (0, common_1.getOptions)('js');
    return (0, swc_parser_base_1.swcParserSync)(infile, opts);
}
exports.jsParser = jsParser;
/** parse js code */
function jsFileParser(code) {
    const opts = (0, common_1.getOptions)('js');
    return (0, swc_parser_base_1.swcParseFileSync)(code, opts);
}
exports.jsFileParser = jsFileParser;
