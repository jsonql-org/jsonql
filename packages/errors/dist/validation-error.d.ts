export default class JsonqlValidationError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
