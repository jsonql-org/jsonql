"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirname = void 0;
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
/* the url has to be import.meta.url, for use in esm env */
function getDirname(url) {
    return (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(url));
}
exports.getDirname = getDirname;
