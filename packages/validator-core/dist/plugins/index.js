"use strict";
// This export files also will get build individually for the client side
// and same thing could apply for the developer add rules
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugins = void 0;
const tslib_1 = require("tslib");
// Here we only provide a list of files and dynamicly import it
const between_1 = tslib_1.__importDefault(require("./between"));
const email_1 = tslib_1.__importDefault(require("./email"));
const float_1 = tslib_1.__importDefault(require("./float"));
const int_1 = tslib_1.__importDefault(require("./int"));
const less_than_equal_1 = tslib_1.__importDefault(require("./less-than-equal"));
const less_than_1 = tslib_1.__importDefault(require("./less-than"));
const more_than_equal_1 = tslib_1.__importDefault(require("./more-than-equal"));
const more_than_1 = tslib_1.__importDefault(require("./more-than"));
const uint_1 = tslib_1.__importDefault(require("./uint"));
const within_1 = tslib_1.__importDefault(require("./within"));
exports.plugins = [
    between_1.default,
    email_1.default,
    float_1.default,
    int_1.default,
    less_than_equal_1.default,
    less_than_1.default,
    more_than_equal_1.default,
    more_than_1.default,
    uint_1.default,
    within_1.default,
];
