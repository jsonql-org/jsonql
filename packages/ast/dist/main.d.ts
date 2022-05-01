/** This will pass the code directly for parsing */
export declare function tsFileParser(code: string): Promise<{
    [x: number]: any;
}>;
/** deal with the function style resolver */
export declare function tsFunctionParser(infile: string): Promise<{
    [x: number]: any;
}>;
/** parse ts file */
export declare function tsClassParser(infile: string): Promise<any>;
/** preconfig */
export declare function getParser(syntax: string, file?: boolean): (infile: string) => Promise<any>;
