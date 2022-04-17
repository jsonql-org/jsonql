/**
 * This is a custom error to throw when server throw a 406
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class Jsonql406Error extends Error {
    static get statusCode(): any;
    constructor(...args: any[]);
    message: any;
    detail: any;
    className: string;
}
//# sourceMappingURL=406-error.d.mts.map