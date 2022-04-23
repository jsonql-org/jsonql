"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructConfig = void 0;
const lodash_1 = require("../lib/lodash");
const constants_1 = require("@jsonql/constants");
const base_1 = require("../base");
// import checkIsBoolean from '../boolean'
// import debug from 'debug';
// const debugFn = debug('jsonql-params-validator:construct-config');
/**
 * create function to construct the config entry so we don't need to keep building object
 */
function constructConfig(args, // should this be string?
type, optional, enumv, checker, alias) {
    const base = {
        [constants_1.ARGS_KEY]: args,
        [constants_1.TYPE_KEY]: type
    };
    if (optional === true) {
        base[constants_1.OPTIONAL_KEY] = true;
    }
    if ((0, base_1.checkArray)(enumv)) {
        base[constants_1.ENUM_KEY] = enumv;
    }
    if ((0, lodash_1.isFunction)(checker)) {
        base[constants_1.CHECKER_KEY] = checker;
    }
    if ((0, lodash_1.isString)(alias)) {
        base[constants_1.ALIAS_KEY] = alias;
    }
    return base;
}
exports.constructConfig = constructConfig;
