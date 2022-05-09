"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.pickInputFile = exports.stripAllTypeParams = exports.stripTypeParams = exports.stripSpan = void 0;
// take out some of the common methods to keep the processor files size down
const constants_1 = require("@jsonql/constants");
const constants_2 = require("./constants");
/** remove all the span props they are no use to us */
function stripSpan(obj) {
    const tmp = {};
    for (const key in obj) {
        if (key !== 'span') {
            if (Array.isArray(obj[key])) {
                tmp[key] = obj[key].map((o) => {
                    if (typeof o === 'object') {
                        return stripSpan(o);
                    }
                    return o;
                });
            }
            else if (typeof obj[key] === 'object') {
                tmp[key] = stripSpan(obj[key]);
            }
            else {
                tmp[key] = obj[key];
            }
        }
    }
    return tmp;
}
exports.stripSpan = stripSpan;
/** strip out all the typesParams from the generate ast because we don't need them in the contract */
function stripTypeParams(astMap) {
    return astMap.map(ast => {
        if (ast[constants_1.TYPE_PARAMS] !== undefined) {
            delete ast[constants_1.TYPE_PARAMS];
        }
        return ast;
    });
}
exports.stripTypeParams = stripTypeParams;
/** clean up the unused options for contract */
function stripAllTypeParams(obj) {
    const cleanResult = {};
    for (const methodName in obj) {
        cleanResult[methodName] = stripTypeParams(obj[methodName]);
    }
    return cleanResult;
}
exports.stripAllTypeParams = stripAllTypeParams;
/** take the error stack processor here and see if it works correctly */
function pickInputFile(e, pattern = '__decorateClass') {
    var _a;
    const stacks = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.split('\n').filter(line => line.indexOf(pattern) > -1);
    const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : '';
    return where;
}
exports.pickInputFile = pickInputFile;
/** wrapper to get the options  */
function getOptions(syntax) {
    if (!constants_2.SYNTAXS[syntax]) {
        throw new Error(`Unsupported syntax! Only allow ts or js`);
    }
    return {
        syntax: constants_2.SYNTAXS[syntax],
        comments: false,
        script: true,
        target: "es5",
        decorators: true,
        // Input source code are treated as module by default
        // isModule: true,
    };
}
exports.getOptions = getOptions;
