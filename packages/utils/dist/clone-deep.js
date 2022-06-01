"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneDeep = void 0;
const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));
exports.cloneDeep = cloneDeep;
