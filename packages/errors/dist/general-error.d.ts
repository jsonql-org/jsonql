export default class GeneralException extends Error {
    detail: any;
    className: string;
    constructor(...args: any[]);
}
