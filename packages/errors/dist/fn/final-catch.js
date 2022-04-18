"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const constants_1 = require("../constants");
/**
 * If using the instance of could not find the actual error then
 * we need to use a different way to analysis the error object to find the exact
 * Error type
 */
/*
function getErrorByObject(e: any, msg: any, detail: any) {
 // @TODO
}
*/
/**
 * this will put into generator call at the very end and catch
 * the error throw from inside then throw again
 * this is necessary because we split calls inside and the throw
 * will not reach the actual client unless we do it this way
 */
function finalCatch(e) {
    // this is a hack to get around the validateAsync not actually throw error
    // instead it just rejected it with the array of failed parameters
    if (Array.isArray(e)) {
        // if we want the message then I will have to create yet another function
        // to wrap this function to provide the name prop
        throw new base_1.JsonqlValidationError('', e);
    }
    const msg = e.message || constants_1.NO_ERROR_MSG;
    const detail = e.detail || e;
    // @BUG the instance of not always work for some reason!
    // need to figure out a better way to find out the type of the error
    switch (true) {
        case e instanceof base_1.Jsonql406Error:
            throw new base_1.Jsonql406Error(msg, detail);
        case e instanceof base_1.Jsonql500Error:
            throw new base_1.Jsonql500Error(msg, detail);
        case e instanceof base_1.JsonqlForbiddenError:
            throw new base_1.JsonqlForbiddenError(msg, detail);
        case e instanceof base_1.JsonqlAuthorisationError:
            throw new base_1.JsonqlAuthorisationError(msg, detail);
        case e instanceof base_1.JsonqlContractAuthError:
            throw new base_1.JsonqlContractAuthError(msg, detail);
        case e instanceof base_1.JsonqlResolverAppError:
            throw new base_1.JsonqlResolverAppError(msg, detail);
        case e instanceof base_1.JsonqlResolverNotFoundError:
            throw new base_1.JsonqlResolverNotFoundError(msg, detail);
        case e instanceof base_1.JsonqlEnumError:
            throw new base_1.JsonqlEnumError(msg, detail);
        case e instanceof base_1.JsonqlTypeError:
            throw new base_1.JsonqlTypeError(msg, detail);
        case e instanceof base_1.JsonqlCheckerError:
            throw new base_1.JsonqlCheckerError(msg, detail);
        case e instanceof base_1.JsonqlValidationError:
            throw new base_1.JsonqlValidationError(msg, detail);
        case e instanceof base_1.JsonqlServerError:
            throw new base_1.JsonqlServerError(msg, detail);
        default:
            throw new base_1.JsonqlError(msg, detail);
    }
}
exports.default = finalCatch;
