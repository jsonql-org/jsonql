"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swcParseFileSync = exports.swcParseFileBase = exports.swcParserSync = exports.swcParserBase = void 0;
const tslib_1 = require("tslib");
// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
// import * as swc from '@swc/core'
const core_1 = require("@swc/core");
/*
import {
  SwcParserOptions,
  SwcParsedResult,
} from './types'
*/
function swcParserBase(infile, options // @TODO
) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, core_1.parseFile)(infile, options);
    });
}
exports.swcParserBase = swcParserBase;
/** sync version of above method */
function swcParserSync(infile, options) {
    return (0, core_1.parseFileSync)(infile, options);
}
exports.swcParserSync = swcParserSync;
/*
No overload matches this call. Overload 1 of 2,
'(path: string,
options: ParseOptions & { isModule: false; }): Promise<Script>',
gave the following error. Argument of type 'SwcParserOptions' is not assignable to parameter of type
'ParseOptions & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type
'EsParserConfig & {
  comments?: boolean | undefined;
  script?: boolean | undefined;
  target?: JscTarget | undefined;
} & { isModule: false; }'.
Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
Types of property 'syntax' are incompatible.
Type 'string | undefined' is not assignable to type '"ecmascript"'.
Type 'undefined' is not assignable to type '"ecmascript"'.
Overload 2 of 2,
'(path: string, options?: ParseOptions | undefined): Promise<Module>',
gave the following error.
Argument of type 'SwcParserOptions' is not assignable to parameter of type
'ParseOptions | undefined'. Type 'SwcParserOptions'
is not assignable to type
'EsParserConfig & {
comments?: boolean | undefined;
script?: boolean | undefined;
target?: JscTarget | undefined;
}'.
Type 'SwcParserOptions' is not assignable to type 'EsParserConfig'.
*/
// parseFile should try this so we can get rip of the fs-extra
/** breaking this out to create a api using just the file */
function swcParseFileBase(code, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (0, core_1.parse)(code, options);
    });
}
exports.swcParseFileBase = swcParseFileBase;
/** parse file sync version */
function swcParseFileSync(code, options) {
    return (0, core_1.parseSync)(code, options);
}
exports.swcParseFileSync = swcParseFileSync;
