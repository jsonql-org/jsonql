"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this will throw from inside the checkOptions
class JsonqlTypeError extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = JsonqlTypeError.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, JsonqlTypeError);
        }
    }
}
exports.default = JsonqlTypeError;
