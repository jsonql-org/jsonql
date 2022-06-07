"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _406_error_1 = tslib_1.__importDefault(require("../406-error"));
const _500_error_1 = tslib_1.__importDefault(require("../500-error"));
const forbidden_error_1 = tslib_1.__importDefault(require("../forbidden-error"));
const authorisation_error_1 = tslib_1.__importDefault(require("../authorisation-error"));
const contract_auth_error_1 = tslib_1.__importDefault(require("../contract-auth-error"));
const resolver_app_error_1 = tslib_1.__importDefault(require("../resolver-app-error"));
const resolver_not_found_error_1 = tslib_1.__importDefault(require("../resolver-not-found-error"));
const enum_error_1 = tslib_1.__importDefault(require("../enum-error"));
const type_error_1 = tslib_1.__importDefault(require("../type-error"));
const checker_error_1 = tslib_1.__importDefault(require("../checker-error"));
const validation_error_1 = tslib_1.__importDefault(require("../validation-error"));
const error_1 = tslib_1.__importDefault(require("../error"));
const server_error_1 = tslib_1.__importDefault(require("../server-error"));
// import GeneralException from '../general-exception'
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
        throw new validation_error_1.default('', e);
    }
    const msg = e.message || constants_1.NO_ERROR_MSG;
    const detail = e.detail || e;
    // @BUG the instance of not always work for some reason!
    // need to figure out a better way to find out the type of the error
    switch (true) {
        case e instanceof _406_error_1.default:
            throw new _406_error_1.default(msg, detail);
        case e instanceof _500_error_1.default:
            throw new _500_error_1.default(msg, detail);
        case e instanceof forbidden_error_1.default:
            throw new forbidden_error_1.default(msg, detail);
        case e instanceof authorisation_error_1.default:
            throw new authorisation_error_1.default(msg, detail);
        case e instanceof contract_auth_error_1.default:
            throw new contract_auth_error_1.default(msg, detail);
        case e instanceof resolver_app_error_1.default:
            throw new resolver_app_error_1.default(msg, detail);
        case e instanceof resolver_not_found_error_1.default:
            throw new resolver_not_found_error_1.default(msg, detail);
        case e instanceof enum_error_1.default:
            throw new enum_error_1.default(msg, detail);
        case e instanceof type_error_1.default:
            throw new type_error_1.default(msg, detail);
        case e instanceof checker_error_1.default:
            throw new checker_error_1.default(msg, detail);
        case e instanceof validation_error_1.default:
            throw new validation_error_1.default(msg, detail);
        case e instanceof server_error_1.default:
            throw new server_error_1.default(msg, detail);
        default:
            throw new error_1.default(msg, detail);
    }
}
exports.default = finalCatch;
