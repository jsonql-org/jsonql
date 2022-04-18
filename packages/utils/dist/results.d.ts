/**
 * get what is calling after the above check
 */
export declare const getCallMethod: (method: string) => false | "query" | "mutation";
/**
 * wrapper method
 */
export declare const packResult: (result: any, ts?: boolean) => string;
/**
 * Check if the error object contain our custom key
 */
export declare const isJsonqlErrorObj: (e: Error) => any;
/**
 * wrapper method - the output is trying to match up the structure of the Error sub class
 */
export declare const packError: (detail: any, className?: string, statusCode?: number, message?: string) => string;
/**
 * handle the return data
 * @TODO how to handle the return timestamp and calculate the diff?
 */
export declare const resultHandler: (result: any) => any;
