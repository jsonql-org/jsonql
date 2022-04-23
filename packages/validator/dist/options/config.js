"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheckConfig = exports.getCheckConfigAsync = exports.createConfig = void 0;
// these was in the index.ts
// which is not very nice - because it's hard to find
// now they are on their own file
// export also create wrapper methods
const check_options_async_1 = require("./check-options-async");
const check_options_sync_1 = require("./check-options-sync");
const construct_config_1 = require("./construct-config");
const constants_1 = require("@jsonql/constants");
/**
 * This has a different interface
 */
function createConfig(value, type, params) {
    // Note the enumv not ENUM
    // const { enumv, optional, checker, alias } = params;
    // let args = [value, type, optional, enumv, checker, alias];
    const { [constants_1.OPTIONAL_KEY]: o, [constants_1.ENUM_KEY]: e, [constants_1.CHECKER_KEY]: c, [constants_1.ALIAS_KEY]: a } = params;
    return construct_config_1.constructConfig.apply(null, [value, type, o, e, c, a]);
}
exports.createConfig = createConfig;
/**
 * construct the actual end user method, rename with prefix get since 1.5.2
 */
function getCheckConfigAsync(validateSync) {
    return function (config, appProps, constantProps = {}) {
        return (0, check_options_async_1.checkOptionsAsync)(config, appProps, constantProps, validateSync);
    };
}
exports.getCheckConfigAsync = getCheckConfigAsync;
/**
 * copy of above but it's sync, rename with prefix get since 1.5.2
 */
function getCheckConfig(validateSync) {
    return function (config, appProps, constantProps = {}) {
        return (0, check_options_sync_1.checkOptionsSync)(config, appProps, constantProps, validateSync);
    };
}
exports.getCheckConfig = getCheckConfig;
