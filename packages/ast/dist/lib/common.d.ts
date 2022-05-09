import { JsonqlProcessedEntry } from '../types';
/** remove all the span props they are no use to us */
export declare function stripSpan(obj: any): {};
/** strip out all the typesParams from the generate ast because we don't need them in the contract */
export declare function stripTypeParams(astMap: Array<JsonqlProcessedEntry>): JsonqlProcessedEntry[];
/** clean up the unused options for contract */
export declare function stripAllTypeParams(obj: any): {};
/** take the error stack processor here and see if it works correctly */
export declare function pickInputFile(e: Error, pattern?: string): string;
/** wrapper to get the options  */
export declare function getOptions(syntax: string): {
    syntax: any;
    comments: boolean;
    script: boolean;
    target: string;
    decorators: boolean;
};
