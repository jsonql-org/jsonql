"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathToFn = exports.isHeaderPresent = exports.headerParser = exports.getDocLen = void 0;
const tslib_1 = require("tslib");
// this is a collection of middleware methods
// should be good to use in Koa or Express
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = require("path");
const dasherize_1 = require("../dasherize");
const constants_1 = require("@jsonql/constants");
const DOT = '.';
/**
 * Get document (string) byte length for use in header
 */
const getDocLen = (doc) => Buffer.byteLength(doc, 'utf8');
exports.getDocLen = getDocLen;
/**
 * The koa ctx object is not returning what it said on the documentation
 * So I need to write a custom parser to check the request content-type
 */
const headerParser = (req, type) => {
    try {
        const headers = req.headers.accept.split(',');
        if (type) {
            return headers.filter((h) => h === type);
        }
        return headers;
    }
    catch (e) {
        // When Chrome dev tool activate the headers become empty
        return [];
    }
};
exports.headerParser = headerParser;
/**
 * wrapper of above method to make it easier to use
 */
const isHeaderPresent = (req, type) => {
    var _a;
    return (!!((_a = (0, exports.headerParser)(req, type)) === null || _a === void 0 ? void 0 : _a.length));
};
exports.isHeaderPresent = isHeaderPresent;
/**
 * Searching for path to the resolver
 */
const getPathToFn = function (name, type, opts) {
    // we should check the type
    const dir = opts[constants_1.RESOLVER_DIR_PROP_KEY];
    const fileName = (0, dasherize_1.dasherize)(name);
    let paths = [];
    if (opts.contract && opts.contract[type] && opts.contract[type].file) {
        paths.push(opts.contract[type].file);
    }
    // @1.2.7 when we search for the socket-auth it will have a different hard path compare to the contract
    const dirPath = type === constants_1.SOCKET_AUTH_NAME ? (0, path_1.join)(constants_1.SOCKET_NAME, constants_1.AUTH_TYPE) : type;
    paths.push((0, path_1.join)(dir, dirPath, fileName, [constants_1.INDEX_KEY, constants_1.EXT].join(DOT)), (0, path_1.join)(dir, dirPath, [fileName, constants_1.EXT].join(DOT)));
    const ctn = paths.length;
    for (let i = 0; i < ctn; ++i) {
        if (fs_1.default.existsSync(paths[i])) {
            return paths[i];
        }
    }
    return false;
};
exports.getPathToFn = getPathToFn;
