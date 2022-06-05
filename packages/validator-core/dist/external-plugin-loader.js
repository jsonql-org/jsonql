"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPluginLoader = void 0;
// Use this when loading external plugins
const validator_plugins_1 = require("./validator-plugins");
// main
class ExternalPluginLoader extends validator_plugins_1.ValidatorPlugins {
    constructor() {
        super();
    }
    /** main method */
    registerExternalPlugin(name, pluginConfig) {
        this._registerExternalPlugin(name, pluginConfig);
    }
}
exports.ExternalPluginLoader = ExternalPluginLoader;
