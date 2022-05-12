"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessByPath = void 0;
const convert_1 = require("./convert");
/** access an object node by dot not path */
function accessByPath(obj, path) {
    if (path.indexOf('.') > -1) {
        const paths = path.split('.').map((p) => (0, convert_1.strToNum)(p));
        const ctn = paths.length;
        let _tmp = null;
        for (let i = 0; i < ctn; ++i) {
            const p = paths[i];
            if (_tmp !== null) {
                _tmp = _tmp[p];
            }
            else {
                _tmp = obj[p];
            }
        }
        return _tmp;
    }
    return obj[path];
}
exports.accessByPath = accessByPath;
