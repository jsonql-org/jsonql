"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = exports.checkArgKeys = exports.curryPlugin = exports.createCoreCurryPlugin = void 0;
// it was in the index and should be on it's own file
/** just make this clear where the plugins coming from */
const utils_1 = require("@jsonql/utils");
const errors_1 = require("@jsonql/errors");
const index_1 = require("./index");
const GLOBAL_PLUGINS = index_1.plugins;
/** This will lookup our internal plugins list */
function createCoreCurryPlugin(input) {
    const { plugin } = input;
    const pluginExport = GLOBAL_PLUGINS.filter(p => plugin === p.name)[0];
    return curryPlugin(input, pluginExport);
}
exports.createCoreCurryPlugin = createCoreCurryPlugin;
/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
function curryPlugin(config, pluginExport) {
    const { plugin } = config;
    if (plugin) {
        const params = pluginExport['params']; // if we use pluginExport.params then TS complain!
        if (params) {
            // @BUG if the input missing the key then it wont throw for example
            // we expect `arg` but pass the `min` then it will run but just failed
            if (!checkArgKeys(config, params)) {
                throw new errors_1.JsonqlError(`Expected params: ${params.join(',')} not found!`);
            }
            const args = params.map((param) => config[param]);
            return Reflect.apply((0, utils_1.curry)(pluginExport.main), null, args);
        }
        else {
            throw new errors_1.JsonqlError(`This plugin ${pluginExport.name} can not be curry`);
        }
    }
    throw new errors_1.JsonqlError(`Unable to find plugin in config`);
}
exports.curryPlugin = curryPlugin;
/** check if the expected key presented in the config */
function checkArgKeys(config, params) {
    return params.filter(key => config[key]).length === params.length;
}
exports.checkArgKeys = checkArgKeys;
/** @TODO it needs to be a js file then it must be after compile */
function getPlugin(pluginName) {
    let p = index_1.plugins[pluginName];
    if (p) {
        p = p === '_' ? pluginName : p;
        return Promise.resolve().then(() => __importStar(require('./' + [p, 'js'].join('.'))));
    }
    throw new Error(`${pluginName} is not found`);
}
exports.getPlugin = getPlugin;
