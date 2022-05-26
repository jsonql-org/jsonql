"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorPlugins = void 0;
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/base/error"));
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
    /** with a idx to id this instance */
    constructor($version) {
        this.$version = $version;
        this._plugins = new Map();
        this._internalPluginNames = [];
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
    argName is the argument name
    */
    lookupPlugin(input, argName) {
        const pluginName = input[constants_1.PLUGIN_KEY];
        if (pluginName && this._plugins.has(pluginName)) {
            const pluginConfig = this._plugins.get(pluginName);
            if (pluginConfig && pluginConfig[constants_1.VALIDATE_ASYNC_KEY]) {
                // here is the problem the name should be the param not the plugin
                return (0, common_1.constructRuleCb)(argName, pluginConfig[constants_1.VALIDATE_ASYNC_KEY], pluginName);
            }
            else if (pluginConfig && pluginConfig[constants_1.PARAMS_KEY]) {
                debug('_pluign', pluginConfig, 'input', input);
                const _input = input;
                return (0, common_1.constructRuleCb)(argName, (0, promisify_1.promisify)(// need to check if the _plugin is internal or not
                (0, utils_1.inArray)(this._internalPluginNames, pluginName) ?
                    (0, plugins_1.createCoreCurryPlugin)(_input) :
                    (0, plugins_1.curryPlugin)(_input, pluginConfig)), pluginName);
            }
        }
        throw new error_1.default(`Unable to find ${pluginName} plugin for ${argName}`);
    }
    /** The public api to register a plugin */
    registerPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig);
    }
    /** export all plugins for generate js file */
    export() {
        const plugins = [];
        this._plugins.forEach((p, n) => {
            if (!this._internalPluginNames.includes(n)) {
                plugins.push(p);
            }
        });
        return plugins;
    }
    // ------------------------- PRIVATE --------------------------//
    /** register plugins */
    _registerPlugin(name, pluginConfig, skipCheck = false // when register internal plugin then skip it
    ) {
        if (!skipCheck) {
            if (this._plugins.has(name)) {
                throw new error_1.default(`plugin ${name} already existed!`);
            }
            if (pluginConfig[constants_1.PARAMS_KEY] !== undefined) {
                if (!(0, common_1.checkPluginArg)(pluginConfig[constants_1.PARAMS_KEY])) {
                    throw new error_1.default(`Your plugin config argument contains reserved keywords`);
                }
            }
            if (!(0, common_1.pluginHasFunc)(pluginConfig)) {
                throw new error_1.default(`Can not find any executable definition within your plugin config`);
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
            case (pluginConfig[constants_1.VALIDATE_ASYNC_KEY] !== undefined && pluginConfig[constants_1.PLUGIN_FN_KEY]):
                delete pluginConfig[constants_1.PLUGIN_FN_KEY]; // remove it
                break;
            // @NOTE we can not create the curryPlugin here because it needs to be generic
            // and the arguement provide at validation time, this need to get create at the _lookupPlugin
            default: // the standard {main: fn} then we need to convert it VALIDATE_ASYNC_KEY
                pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(pluginConfig[constants_1.PLUGIN_FN_KEY]);
                delete pluginConfig[constants_1.PLUGIN_FN_KEY]; // remove it
        }
        // debug(`add plugin`, name, pluginConfig)
        this._plugins.set(name, pluginConfig);
    }
}
exports.ValidatorPlugins = ValidatorPlugins;
