"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
/**
 * This is a custom error to throw when server throw a 500
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
class Jsonql500Error extends Error {
    constructor(...args) {
        super(...args);
        this.message = args[0];
        this.detail = args[1];
        this.className = Jsonql500Error.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Jsonql500Error);
        }
    }
    static get statusCode() {
        return constants_1.SERVER_INTERNAL_STATUS;
    }
}
exports.default = Jsonql500Error;
