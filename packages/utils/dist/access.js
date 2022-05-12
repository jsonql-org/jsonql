"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessByPath = void 0;
/** access an object node by dot not path */
function accessByPath(obj, path) {
    if (path.indexOf('.') > -1) {
        const paths = path.split('.');
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
