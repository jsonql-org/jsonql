"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorPlugins = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("@jsonql/errors");
const utils_1 = require("@jsonql/utils");
const constants_1 = require("./constants");
const string_1 = require("./base/string");
const plugins_1 = require("./plugins/plugins");
const promisify_1 = require("./lib/promisify");
const common_1 = require("./lib/common");
const plugins_2 = require("./plugins");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:validator-core:validator-plugin');
// main
class ValidatorPlugins {
    constructor() {
        this._plugins = new Map();
        this._internalPluginNames = [];
        this._externalPluginNames = [];
        // register internal plugins
        plugins_2.plugins.forEach((plugin) => {
            if (!plugin[constants_1.PARAMS_KEY]) {
                // We skip those need to curry and do that JIT
                plugin[constants_1.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(plugin[constants_1.PLUGIN_FN_KEY]);
            }
            const name = plugin[constants_1.NAME_KEY];
            this._internalPluginNames.push(name);
            this._registerPlugin(name, plugin, true);
        });
    }
    /**
    find the plugin internal or external
    propName is the argument name
    */
    lookupPlugin(input, propName) {
        const pluginName = input[constants_1.PLUGIN_KEY];
        if (pluginName && this._plugins.has(pluginName)) {
            // @TODO need to transform this
            const pluginConfig = this._plugins.get(pluginName);
            if (pluginConfig && pluginConfig[constants_1.VALIDATE_ASYNC_KEY]) {
                // here is the problem the name should be the param not the plugin
                return (0, common_1.constructRuleCb)(propName, pluginConfig[constants_1.VALIDATE_ASYNC_KEY], pluginName);
            }
            else if (pluginConfig && pluginConfig[constants_1.PARAMS_KEY]) {
                debug('_pluign', pluginConfig, 'input', input);
                const _input = input;
                return (0, common_1.constructRuleCb)(propName, (0, promisify_1.promisify)(// need to check if the _plugin is internal or not
                (0, utils_1.inArray)(this._internalPluginNames, pluginName) ?
                    (0, plugins_1.createCoreCurryPlugin)(_input) :
                    (0, plugins_1.curryPlugin)(_input, pluginConfig)), pluginName);
            }
        }
        throw new errors_1.JsonqlError(`Unable to find ${pluginName} plugin for ${propName}`);
    }
    /** The public api to register a plugin */
    registerPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig);
    }
    /** basically overload the _registerPlugin with adding name to ext list */
    loadExtPlugin(name, pluginConfig) {
        if (!this._externalPluginNames.includes(name)) {
            this._internalPluginNames.push(name);
            this._registerPlugin(name, pluginConfig);
        }
        else {
            throw new errors_1.JsonqlError(`${name} already added!`, name);
        }
    }
    /** get a list of the plugin names */
    getPluginNames(ext = false) {
        if (ext === true) {
            return this._externalPluginNames;
        }
        return this._internalPluginNames.concat(this._externalPluginNames);
    }
    // ------------------------- PRIVATE --------------------------//
    /** register plugins */
    _registerPlugin(name, pluginConfig, skipCheck = false // when register internal plugin then skip it
    ) {
        if (!skipCheck) {
            if (this._plugins.has(name)) {
                throw new errors_1.JsonqlError(`plugin ${name} already existed!`);
            }
            if (pluginConfig[constants_1.PARAMS_KEY] !== undefined) {
                if (!(0, common_1.checkPluginArg)(pluginConfig[constants_1.PARAMS_KEY])) {
                    throw new errors_1.JsonqlError(`Your plugin config argument contains reserved keywords`);
                }
            }
            if (!(0, common_1.pluginHasFunc)(pluginConfig)) {
                throw new errors_1.JsonqlError(`Can not find any executable definition within your plugin config`);
            }
        }
        // put the name back in
        pluginConfig.name = name;
        /**
        Here is a problem, when we need to add this to the contract
        the info here is already constructed for running with validation
        which is not suitable to transport over the wire, we need to
        go higher (register via file base) to add such info
        */
        switch (true) {
            // this rule is not really in use but keep here for future
            case (!pluginConfig[constants_1.VALIDATE_ASYNC_KEY] &&
                pluginConfig[constants_1.VALIDATE_KEY] &&
                (0, utils_1.isFunction)(pluginConfig[constants_1.VALIDATE_KEY])):
                pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(pluginConfig[constants_1.VALIDATE_KEY]);
                break;
            // use the pattern key to generate plugin method
            case (pluginConfig[constants_1.PATTERN_KEY] &&
                (0, string_1.checkString)(pluginConfig[constants_1.PATTERN_KEY])):
                pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = (0, common_1.patternPluginFanctory)(pluginConfig[constants_1.PATTERN_KEY]);
                break;
            // @NOTE we can not create the curryPlugin here because it needs to be generic
            // and the arguement provide at validation time, this need to get create at the _lookupPlugin
            default:
            // @TODO more situations
        }
        this._plugins.set(name, pluginConfig);
    }
}
exports.ValidatorPlugins = ValidatorPlugins;
