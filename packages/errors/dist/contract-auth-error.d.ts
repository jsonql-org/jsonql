/**
 * This is a custom error when not supply the credential and try to get contract
 * This help us to capture the right error, due to the call happens in sequence
 * @param {string} message to tell what happen
 * @param {mixed} extra things we want to add, 500?
 */
export default class JsonqlContractAuthError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
    static get statusCode(): number;
}
