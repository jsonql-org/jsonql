"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorPlugins = void 0;
const tslib_1 = require("tslib");
const error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/error"));
const constants_1 = require("./constants");
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
            // we don't do the convert here anymore, and wait until the look up
            // then we store it back JIT
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
            // unconverted
            if (pluginConfig[constants_1.PLUGIN_FN_KEY] && !pluginConfig[constants_1.PARAMS_KEY]) {
                // let it fall to the next
                pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(pluginConfig[constants_1.PLUGIN_FN_KEY]);
            }
            // already converted
            if (pluginConfig && pluginConfig[constants_1.VALIDATE_ASYNC_KEY] && !pluginConfig[constants_1.PARAMS_KEY]) {
                return (0, common_1.constructRuleCb)(argName, pluginConfig[constants_1.VALIDATE_ASYNC_KEY], pluginName);
            }
            // needs to curry
            if (pluginConfig && pluginConfig[constants_1.PARAMS_KEY]) {
                debug('pluginConfig --->', pluginConfig);
                debug('input----------->', input);
                const _input = input;
                return (0, common_1.constructRuleCb)(argName, (0, promisify_1.promisify)((0, plugins_1.curryPlugin)(_input, pluginConfig)), pluginName);
            }
        }
        debug('lookupPlugin', 'unable to find', pluginName);
        throw new error_1.default(`Unable to find plugin: ${pluginName}`);
    }
    /** The public api to register a plugin */
    registerPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig);
    }
    /** call this when loading external plugin, not allow to use directly */
    _registerExternalPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig, false, true);
    }
    /** this is no longer in use and we change the usage to export list of names that can be add to contract */
    export(external = true) {
        const plugins = [];
        this._plugins.forEach((p, n) => {
            if (!this.isBuiltIn(n) && p.external === external) {
                plugins.push(p);
            }
        });
        return plugins;
    }
    /** just check if this plugin is built-in */
    isBuiltIn(pluginName) {
        return this._internalPluginNames.includes(pluginName);
    }
    // ------------------------- PRIVATE --------------------------//
    /** register plugins */
    _registerPlugin(name, pluginConfig, skipCheck = false, // when register internal plugin then skip it
    external = false // new in 0.9.11
    ) {
        if (!skipCheck) {
            if (this._plugins.has(name)) {
                throw new error_1.default(`plugin ${name} already existed!`);
            }
            if (!(0, common_1.pluginHasFunc)(pluginConfig)) {
                debug('registerPlugin', constants_1.MAIN_NOT_FOUND_ERR);
                throw new error_1.default(constants_1.MAIN_NOT_FOUND_ERR);
            }
            // Here we could extract the params instead of just checking
            if (pluginConfig[constants_1.PARAMS_KEY] === undefined) {
                pluginConfig = (0, common_1.searchParamsKey)(pluginConfig);
                debug('auto generate params for plugin', pluginConfig);
            }
            else if (pluginConfig[constants_1.PARAMS_KEY] !== undefined) { // if they provide the keys then we check
                if (!(0, common_1.checkPluginArg)(pluginConfig[constants_1.PARAMS_KEY])) {
                    debug('registerPlugin', constants_1.RESERVED_WORD_ERR);
                    throw new error_1.default(constants_1.RESERVED_WORD_ERR);
                }
                if (!(0, common_1.paramMatches)(pluginConfig)) {
                    debug('registerPlugin', constants_1.ARG_NOT_MATCH_ERR);
                    throw new error_1.default(constants_1.ARG_NOT_MATCH_ERR);
                }
            }
        }
        pluginConfig.name = name;
        pluginConfig.external = external;
        /**
        At this point it should only contain a main (or plus params) so we
        do nothing and just store it, we convert it only when they call it
        */
        this._plugins.set(name, pluginConfig);
    }
}
exports.ValidatorPlugins = ValidatorPlugins;
