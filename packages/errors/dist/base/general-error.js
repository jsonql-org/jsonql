"use strict";
// this is a new Error class that is not part of the Jsonql
// but we will use it in other external modules
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralError extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = GeneralError.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GeneralError);
        }
    }
}
exports.default = GeneralError;
