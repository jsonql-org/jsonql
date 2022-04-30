"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const more_than_equal_1 = tslib_1.__importDefault(require("./more-than-equal"));
const less_than_equal_1 = tslib_1.__importDefault(require("./less-than-equal"));
const name = 'main';
function main(max, min, value) {
    return less_than_equal_1.default.main(max, value) && more_than_equal_1.default.main(min, value);
}
exports.default = {
    name,
    main,
    params: ['max', 'min']
};
