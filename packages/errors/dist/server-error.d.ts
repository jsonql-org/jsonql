export default class JsonqlServerError extends Error {
    statusCode: string | number;
    className: string;
    constructor(statusCode: string | number, message?: string);
    static get statusCode(): number;
}
