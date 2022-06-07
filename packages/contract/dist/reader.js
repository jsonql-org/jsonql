"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractReader = void 0;
const utils_1 = require("@jsonql/utils");
const constants_1 = require("./constants");
// @TODO add protobuf
class ContractReader {
    constructor(contract) {
        this._contract = (0, utils_1.readOnly)(contract);
    }
    _access(key, path) {
        const d = this._contract[key];
        if (path) {
            return (0, utils_1.accessByPath)(d, path);
        }
        return d;
    }
    data(path) {
        return this._access(constants_1.DATA_KEY, path);
    }
    meta(path) {
        return this._access(constants_1.META_KEY, path);
    }
    error(path) {
        return this._access(constants_1.ERROR_KEY, path);
    }
}
exports.ContractReader = ContractReader;
