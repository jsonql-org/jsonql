export default class JsonqlTypeError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
