"use strict";
// This export files also will get build individually for the client side
// and same thing could apply for the developer add rules
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = exports.curryPlugin = exports.plugins = void 0;
const tslib_1 = require("tslib");
// Here we only provide a list of files and dynamicly import it
const between_1 = tslib_1.__importDefault(require("./between"));
const email_1 = tslib_1.__importDefault(require("./email"));
const int_1 = tslib_1.__importDefault(require("./int"));
const less_than_equal_1 = tslib_1.__importDefault(require("./less-than-equal"));
const less_than_1 = tslib_1.__importDefault(require("./less-than"));
const more_than_equal_1 = tslib_1.__importDefault(require("./more-than-equal"));
const more_than_1 = tslib_1.__importDefault(require("./more-than"));
const uint_1 = tslib_1.__importDefault(require("./uint"));
const within_1 = tslib_1.__importDefault(require("./within"));
const src_1 = require("@jsonql/utils/src");
const src_2 = require("@jsonql/errors/src");
exports.plugins = [
    between_1.default,
    email_1.default,
    int_1.default,
    less_than_equal_1.default,
    less_than_1.default,
    more_than_equal_1.default,
    more_than_1.default,
    uint_1.default,
    within_1.default,
];
/** construct the curry plugin method */
function curryPlugin(config) {
    const { plugin } = config;
    if (plugin) {
        const pluginExport = exports.plugins.filter(p => plugin === p.name)[0];
        const params = pluginExport['params']; // if we use pluginExport.params then TS complain!
        if (params) {
            const args = params.map((param) => config[param]);
            return Reflect.apply((0, src_1.curry)(pluginExport.main), null, args);
        }
        else {
            throw new src_2.JsonqlError(`This plugin ${pluginExport.name} can not be curry`);
        }
    }
    throw new src_2.JsonqlError(`Unable to find plugin`);
}
exports.curryPlugin = curryPlugin;
/** @TODO it needs to be a js file then it must be after compile */
function getPlugin(pluginName) {
    let p = exports.plugins[pluginName];
    if (p) {
        p = p === '_' ? pluginName : p;
        return Promise.resolve().then(() => tslib_1.__importStar(require('./' + [p, 'js'].join('.'))));
    }
    throw new Error(`${pluginName} is not found`);
}
exports.getPlugin = getPlugin;
