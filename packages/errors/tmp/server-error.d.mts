export default class JsonqlServerError extends Error {
    static get statusCode(): any;
    constructor(statusCode: any, message: any);
    statusCode: any;
    className: string;
}
//# sourceMappingURL=server-error.d.mts.map