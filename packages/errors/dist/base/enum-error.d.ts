export default class JsonqlEnumError extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
