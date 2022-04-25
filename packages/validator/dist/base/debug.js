"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
const tslib_1 = require("tslib");
// just a wrapper
const debug_1 = tslib_1.__importDefault(require("debug"));
function debug(name) {
    return (0, debug_1.default)('jsonql:validator:' + name);
}
exports.debug = debug;
