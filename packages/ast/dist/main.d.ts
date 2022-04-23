export declare function jsParser(infile: string): void;
/** deal with the function style resolver */
export declare function tsFunctionParser(infile: string): Promise<{
    [x: number]: any;
}>;
/** parse ts file */
export declare function tsClassParser(infile: string): Promise<any>;
/** preconfig */
export declare function getParser(syntax: string): (infile: string) => Promise<any>;
