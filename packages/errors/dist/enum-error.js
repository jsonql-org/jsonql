"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this get throw from within the checkOptions when run through the enum failed
class JsonqlEnumError extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = JsonqlEnumError.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, JsonqlEnumError);
        }
    }
}
exports.default = JsonqlEnumError;
