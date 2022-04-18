"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
/**
 * This is a custom error to throw whenever a error happen inside the jsonql
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
class JsonqlError extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = JsonqlError.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, JsonqlError);
            // this.detail = this.stack;
        }
    }
    static get statusCode() {
        return constants_1.NO_STATUS_CODE;
    }
}
exports.default = JsonqlError;
