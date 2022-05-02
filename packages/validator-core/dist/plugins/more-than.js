"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const len_1 = require("../lib/len");
const name = 'moreThan';
function main(num, value) {
    return (0, len_1.len)(value) > num;
}
exports.default = {
    name,
    main,
    params: ['num']
};
