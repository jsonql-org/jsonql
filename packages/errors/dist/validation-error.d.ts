export default class ValidationError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
