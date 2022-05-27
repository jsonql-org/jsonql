export default class GeneralError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
