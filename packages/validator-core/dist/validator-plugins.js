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
                const mainFn = (0, promisify_1.promisify)(pluginConfig[constants_1.PLUGIN_FN_KEY]);
                // mainFn = isAsyncFn(mainFn) ? mainFn : promisify(mainFn)
                this._plugins.set(pluginName, { [constants_1.VALIDATE_ASYNC_KEY]: mainFn, name: pluginName }); // override
                pluginConfig[constants_1.VALIDATE_ASYNC_KEY] = mainFn; // let it fall to the next
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
        throw new error_1.default(`Unable to find plugin: ${pluginName}`);
    }
    /** The public api to register a plugin */
    registerPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig);
    }
    /** export all external plugins for generate js file */
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
            if (!(0, common_1.pluginHasFunc)(pluginConfig)) {
                throw new error_1.default(`Can not find 'main' method in your plugin config`);
            }
            if (!(0, common_1.paramMatches)(pluginConfig)) {
                throw new error_1.default(`Your params doesn't matching your main argument list`);
            }
            if (pluginConfig[constants_1.PARAMS_KEY] !== undefined) {
                if (!(0, common_1.checkPluginArg)(pluginConfig[constants_1.PARAMS_KEY])) {
                    throw new error_1.default(`Your plugin config argument contains reserved keywords`);
                }
            }
        }
        pluginConfig.name = name;
        /**
        At this point it should only contain a main (or plus params) so we
        do nothing and just store it, we convert it only when they call it
        */
        this._plugins.set(name, pluginConfig);
    }
}
exports.ValidatorPlugins = ValidatorPlugins;
