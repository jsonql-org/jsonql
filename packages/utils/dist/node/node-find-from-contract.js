"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFromContract = void 0;
const tslib_1 = require("tslib");
// contract related methods
// This is ported back from ws-server and it will get use in the server / client side
const fs_1 = tslib_1.__importDefault(require("fs"));
/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 */
function findFromContract(type, name, contract) {
    if (contract[type] && contract[type][name] && contract[type][name].file) {
        if (fs_1.default.existsSync(contract[type][name].file)) {
            return contract[type][name].file;
        }
    }
    return false;
}
exports.findFromContract = findFromContract;
