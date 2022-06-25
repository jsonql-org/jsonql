"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
// test for float
const number_1 = require("../base/number");
exports.name = 'float';
function main(value) {
    return (0, number_1.checkFloat)(value);
}
exports.default = {
    name: exports.name,
    main,
};
