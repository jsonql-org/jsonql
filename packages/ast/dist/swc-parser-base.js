"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swcParseFileBase = exports.swcParserBase = void 0;
const tslib_1 = require("tslib");
// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
const swc = tslib_1.__importStar(require("@swc/core"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
// import { SwcParserOptions, SwcParsedResult } from './types'
function swcParserBase(infile, options //SwcParserOptions // @TODO
) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return fs_extra_1.default.readFile(infile)
            .then((code) => code.toString())
            .then((code) => tslib_1.__awaiter(this, void 0, void 0, function* () { return swcParseFileBase(code, options); }));
    });
}
exports.swcParserBase = swcParserBase;
/** breaking this out to create a api using just the file */
function swcParseFileBase(code, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return swc.parse(code, options);
    });
}
exports.swcParseFileBase = swcParseFileBase;
/*

import { JsonqlError } from '@jsonql/errors'
import { inArray } from '@jsonql/utils'

const supportedSyntax = ['ecmascript', 'typescript']
const baseOptions = {
  syntax, // "ecmascript" | "typescript"
  comments: false,
  script: true,
  target: "es5",
  decorators: true,
  // Input source code are treated as module by default
  isModule: true,
}
const options = opts ? Object.assign(baseOptions, opts) : baseOptions
if (!inArray(supportedSyntax, syntax)) {
  throw new JsonqlError('swcParserBase', `${syntax} is not supported!`)
}
*/
