"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promise = void 0;
const tslib_1 = require("tslib");
/* looks silly but save a lot of typing */
const promise = (cb) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return new Promise(cb); });
exports.promise = promise;
