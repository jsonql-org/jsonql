/**
 * this is the 403 Forbidden error
 * that means this user is not login
 * use the 401 for try to login and failed
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlForbiddenError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
    static get statusCode(): number;
}
