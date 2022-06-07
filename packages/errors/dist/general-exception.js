"use strict";
// this is a new Error class that is not part of the Jsonql
// but we will use it in other external modules
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralException extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = GeneralException.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GeneralException);
        }
    }
}
exports.default = GeneralException;
