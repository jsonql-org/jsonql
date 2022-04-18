/**
 * This is a custom error to throw when server throw a 500
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class Jsonql500Error extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
    static get statusCode(): 500;
}
