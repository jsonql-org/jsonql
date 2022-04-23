"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResolverReturnsAsync = exports.checkResolverReturns = exports.checkReturnsAsync = exports.checkReturns = void 0;
// validate the return result using the contract defintion
const main_1 = require("./main");
const errors_1 = require("@jsonql/errors");
const constants_1 = require("../lib/constants");
/**
 * extra the defintion from contract using resolverType --> resolverName
 */
function getDefFromContract(resolverType, resolverName, contract) {
    if (contract[resolverType] && contract[resolverType][resolverName]) {
        return contract[resolverType][resolverName];
    }
    return false;
}
/**
 * then we package the result once again for easier to use
 */
function packageResult(result, args) {
    let obj = { [constants_1.DATA_KEY]: [], [constants_1.ERROR_KEY]: [] };
    if (result.length) {
        obj[constants_1.ERROR_KEY] = result;
    }
    else {
        obj[constants_1.DATA_KEY] = args;
    }
    return obj;
}
/**
 * Basically it's an alias to the validateSync
 */
function checkReturns(value, params, async = false) {
    const args = [value];
    if (async) {
        return (0, main_1.validateAsync)(args, params)
            .then((result) => packageResult(result, args));
    }
    const result = (0, main_1.validateSync)(args, params);
    return packageResult(result, args);
}
exports.checkReturns = checkReturns;
// just a wrapper method
const checkReturnsAsync = (value, params) => (checkReturns(value, params, true));
exports.checkReturnsAsync = checkReturnsAsync;
/**
 * The combine method for use to check the resolver returns with contract
 */
function checkResolverReturns(resolverType, resolverName, contract, value) {
    // console.info('checkResolverReturns -->', resolverType, resolverName, contract, args)
    const def = getDefFromContract(resolverType, resolverName, contract);
    if (def) {
        // format the value
        return checkReturns(value, def[constants_1.RETURNS_NAME]);
    }
    throw new errors_1.JsonqlValidationError('checkResolverReturns', `${resolverType}.${resolverName} ${constants_1.RETURNS_NAME} not found`);
}
exports.checkResolverReturns = checkResolverReturns;
/**
 * The async version of checkResolverReturns
 */
function checkResolverReturnsAsync(resolverType, resolverName, contract, value) {
    const def = getDefFromContract(resolverType, resolverName, contract);
    if (def) {
        return checkReturns(value, def[constants_1.RETURNS_NAME], true);
    }
    return Promise.reject(new errors_1.JsonqlValidationError('checkResolverReturnsAsync', `${resolverType}.${resolverName} ${constants_1.RETURNS_NAME} not found`));
}
exports.checkResolverReturnsAsync = checkResolverReturnsAsync;
