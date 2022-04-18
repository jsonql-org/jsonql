"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonqlConsoleUrl = exports.isJsonqlRequest = exports.isJsonqlPath = void 0;
// this methos was in the node-koa before
// but they should be generic to use across different modules
const node_middleware_1 = require("./node-middleware");
/**
 * @TODO need to be more flexible
 */
const isJsonqlPath = (ctx, opts) => ctx.path === opts.jsonqlPath;
exports.isJsonqlPath = isJsonqlPath;
/**
 * combine two check in one and save time
 * @return {boolean} check result
 */
const isJsonqlRequest = (ctx, opts) => {
    const header = (0, node_middleware_1.isHeaderPresent)(ctx.request, opts.contentType);
    if (header) {
        return (0, exports.isJsonqlPath)(ctx, opts);
    }
    return false;
};
exports.isJsonqlRequest = isJsonqlRequest;
/**
 * check if this is point to the jsonql console
 */
const isJsonqlConsoleUrl = (ctx, opts) => (ctx.method === 'GET' && (0, exports.isJsonqlPath)(ctx, opts));
exports.isJsonqlConsoleUrl = isJsonqlConsoleUrl;
