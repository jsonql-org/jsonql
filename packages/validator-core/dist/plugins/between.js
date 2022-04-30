"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// between
const more_than_1 = tslib_1.__importDefault(require("./more-than"));
const less_than_1 = tslib_1.__importDefault(require("./less-than"));
const name = 'between';
function main(max, min, value) {
    return less_than_1.default.main(max, value) && more_than_1.default.main(min, value);
}
// so when we register it, we know what param we should expect
exports.default = {
    main,
    name,
    params: ['max', 'min']
};
