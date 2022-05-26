"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = exports.checkArgKeys = exports.curryPlugin = void 0;
const tslib_1 = require("tslib");
// it was in the index and should be on it's own file
/** just make this clear where the plugins coming from */
const lodash_1 = require("@jsonql/utils/dist/lodash");
const error_1 = tslib_1.__importDefault(require("@jsonql/errors/dist/base/error"));
const constants_1 = require("../constants");
const index_1 = require("./index");
/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
function curryPlugin(input, pluginConfig) {
    const { plugin } = input;
    if (plugin) {
        const params = pluginConfig[constants_1.PARAMS_KEY]; // if we use pluginExport.params then TS complain!
        if (params) {
            // @BUG if the input missing the key then it wont throw for example
            // we expect `arg` but pass the `min` then it will run but just failed
            if (!checkArgKeys(input, params)) {
                throw new error_1.default(`Expected params: ${params.join(',')} not found!`);
            }
            const args = params.map((param) => input[param]);
            return Reflect.apply((0, lodash_1.curry)(pluginConfig.main), null, args);
        }
        else {
            throw new error_1.default(`This plugin ${pluginConfig.name} can not be curry`);
        }
    }
    throw new error_1.default(`Unable to find plugin in config`);
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
        return Promise.resolve().then(() => tslib_1.__importStar(require('./' + [p, 'js'].join('.'))));
    }
    throw new Error(`${pluginName} is not found`);
}
exports.getPlugin = getPlugin;
