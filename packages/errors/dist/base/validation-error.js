"use strict";
// custom validation error class
// when validaton failed
// should there also be a errors result somewhere 
Object.defineProperty(exports, "__esModule", { value: true });
class JsonqlValidationError extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = JsonqlValidationError.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, JsonqlValidationError);
        }
    }
}
exports.default = JsonqlValidationError;
