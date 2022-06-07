"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorsServer = void 0;
const tslib_1 = require("tslib");
const node_path_1 = require("node:path");
const glob_1 = tslib_1.__importDefault(require("glob"));
const validators_1 = require("./validators");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('jsonql:valdiators-server');
// main
class ValidatorsServer extends validators_1.Validators {
    constructor(astMap) {
        super(astMap);
    }
    /** loading and register external plugins */
    loadExternalPlugins(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const plugins = yield this._importExternalPlugins(path);
            return plugins.map((plugin) => {
                debug('loaded plugin', plugin);
                const config = this._getPluginValue(plugin);
                this._plugin.registerExternalPlugin(config.name, config);
                return config;
            });
        });
    }
    /** esbuild some shit code */
    _getPluginValue(plugin) {
        const value = plugin.default;
        if (value.default) {
            return value.default;
        }
        return value;
    }
    /**
      pass a path and we search for plugins and load it
      we only support js files at the moment
    */
    _importExternalPlugins(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolver, rejecter) => {
                (0, glob_1.default)((0, node_path_1.join)(path, '*.js'), (err, files) => {
                    if (err) {
                        return rejecter(`Something went wrong ${err}`);
                    }
                    if (files.length === 0) {
                        return rejecter(`No plugin file found, we only support js files at the moment!`);
                    }
                    Promise.all(files.map((file) => Promise.resolve().then(() => tslib_1.__importStar(require(file))))).then((results) => {
                        resolver(results);
                    });
                });
            });
        });
    }
}
exports.ValidatorsServer = ValidatorsServer;
