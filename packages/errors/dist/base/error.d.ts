/**
 * This is a custom error to throw whenever a error happen inside the jsonql
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
    static get statusCode(): -1;
}
