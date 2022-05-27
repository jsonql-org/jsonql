"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
// this is from an example from Koa team to use for internal middleware ctx.throw
// but after the test the res.body part is unable to extract the required data
// I keep this one here for future reference
class JsonqlServerError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.className = JsonqlServerError.name;
    }
    static get statusCode() {
        return constants_1.SERVER_INTERNAL_STATUS;
    }
}
exports.default = JsonqlServerError;
