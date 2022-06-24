"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.len = void 0;
// import { isString } from '@jsonql/utils/dist/lodash'
// @NOTE can not use the isString method because stupid Typescript complaint it's not string
// even you cast it again
function len(value) {
    return typeof value === 'string'
        ? value.length
        : value;
}
exports.len = len;
