/**
 * this is the 403 Forbidden error
 * that means this user is not login
 * use the 401 for try to login and failed
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlForbiddenError extends Error {
    static get statusCode(): any;
    constructor(...args: any[]);
    message: any;
    detail: any;
    className: string;
}
//# sourceMappingURL=forbidden-error.d.mts.map