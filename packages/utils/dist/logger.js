"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.logger = void 0;
/**
 * simple for browser console.info wrapper
 */
function logger(...args) {
    try {
        if (window && window.DEBUG) {
            Reflect.apply(console.log, console, args);
        }
    }
    catch (e) {
        return;
    }
}
exports.logger = logger;
/**
 * generic logger method can control via global property
 */
const getLogger = (name) => {
    const base = [name];
    return (...args) => {
        try {
            if (window && window.JSONQL_DEBUG) {
                Reflect.apply(console.info, console, base.concat(args));
            }
        }
        catch (e) {
            return;
        }
    };
};
exports.getLogger = getLogger;
