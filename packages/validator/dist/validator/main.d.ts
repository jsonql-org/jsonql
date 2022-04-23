/**
 * padding the arguments with defaultValue if the arguments did not provide the value
 * this will be the name export
 */
export declare const normalizeArgs: (args: any[], params: any[]) => {
    arg: any;
    index: number;
    param: any;
}[];
/**
 * validator main interface
 */
export declare const validateSync: (args: any[], params: any[], withResult?: boolean) => {
    arg: any;
    index: number;
    param: any;
}[] | {
    error: {
        arg: any;
        index: number;
        param: any;
    }[];
    data: any[];
};
/**
 * A wrapper method that return promise
 */
export declare const validateAsync: (args: any[], params: any[], withResult?: boolean) => Promise<unknown>;
