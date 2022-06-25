"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
// test for integer
const number_1 = require("../base/number");
exports.name = 'int';
function main(value) {
    return (0, number_1.checkInteger)(value);
}
exports.default = {
    name: exports.name,
    main,
};
