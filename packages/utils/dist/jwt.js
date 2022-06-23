"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJWT = void 0;
/**
 * Decode a JWT payload
 * https://stackoverflow.com/a/38552302
 */
function parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
exports.parseJWT = parseJWT;
