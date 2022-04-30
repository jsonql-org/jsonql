"use strict";
// test for integer
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
exports.name = "int";
function main(value) {
    return Number.isInteger(value);
}
exports.default = {
    name: exports.name,
    main,
};
