"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareArgsForValidation = exports.processConfigAction = exports.preservePristineValues = exports.mapAliasConfigKeys = void 0;
const lodash_1 = require("../lib/lodash");
const constants_1 = require("../lib/constants");
const utils_1 = require("@jsonql/utils");
/**
 * Map the alias to their key then grab their value over
 */
function mapAliasConfigKeys(config, appProps) {
    // need to do two steps
    // 1. take key with alias key
    const aliasMap = (0, lodash_1.omitBy)(appProps, value => !value[constants_1.ALIAS_KEY]);
    if ((0, utils_1.isEmptyObj)(aliasMap)) {
        return config;
    }
    return (0, lodash_1.mapKeys)(config, (_, key) => (0, lodash_1.findKey)(aliasMap, o => o.alias === key) || key);
}
exports.mapAliasConfigKeys = mapAliasConfigKeys;
/**
 * We only want to run the valdiation against the config (user supplied) value
 * but keep the defaultOptions untouch
 */
function preservePristineValues(config, appProps) {
    // @BUG this will filter out those that is alias key
    // we need to first map the alias keys back to their full key
    const _config = mapAliasConfigKeys(config, appProps);
    // take the default value out
    const pristineValues = (0, lodash_1.mapValues)((0, lodash_1.omitBy)(appProps, (_, key) => (0, utils_1.objectHasKey)(_config, key)), value => value.args);
    // for testing the value
    const checkAgainstAppProps = (0, lodash_1.omitBy)(appProps, (_, key) => !(0, utils_1.objectHasKey)(_config, key));
    // output
    return {
        pristineValues,
        checkAgainstAppProps,
        config: _config // passing this correct values back
    };
}
exports.preservePristineValues = preservePristineValues;
/**
 * This will take the value that is ONLY need to check
 */
function processConfigAction(config, props) {
    // debugFn('processConfigAction', props)
    // v.1.2.0 add checking if its mark optional and the value is empty then pass
    return (0, lodash_1.mapValues)(props, (value, key) => (config[key] === undefined ||
        (value[constants_1.OPTIONAL_KEY] === true &&
            (0, utils_1.isEmpty)(config[key]))
        ? (0, lodash_1.merge)({}, value, { [constants_1.KEY_WORD]: true })
        : {
            [constants_1.ARGS_KEY]: config[key],
            [constants_1.TYPE_KEY]: value[constants_1.TYPE_KEY],
            [constants_1.OPTIONAL_KEY]: value[constants_1.OPTIONAL_KEY] || false,
            [constants_1.ENUM_KEY]: value[constants_1.ENUM_KEY] || false,
            [constants_1.CHECKER_KEY]: value[constants_1.CHECKER_KEY] || false
        }));
}
exports.processConfigAction = processConfigAction;
/**
 * Quick transform
 * @TODO we should only validate those that is pass from the config
 * and pass through those values that is from the defaultOptions
 */
function prepareArgsForValidation(opts, appProps) {
    const { config, pristineValues, checkAgainstAppProps } = preservePristineValues(opts, appProps);
    // output
    return [
        processConfigAction(config, checkAgainstAppProps),
        pristineValues
    ];
}
exports.prepareArgsForValidation = prepareArgsForValidation;
