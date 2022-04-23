"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickInputFile = exports.stripSpan = void 0;
// take out some of the common methods to keep the processor files size down
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
/** take the error stack processor here and see if it works correctly */
function pickInputFile(e, pattern = '__decorateClass') {
    var _a;
    const stacks = (_a = e.stack) === null || _a === void 0 ? void 0 : _a.split('\n').filter(line => line.indexOf(pattern) > -1);
    const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : '';
    return where;
}
exports.pickInputFile = pickInputFile;
