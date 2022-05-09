export declare function swcParserBase(infile: string, options: any): Promise<any>;
/** sync version of above method */
export declare function swcParserSync(infile: string, options: any): import("@swc/core").Script;
/** breaking this out to create a api using just the file */
export declare function swcParseFileBase(code: string, options: any): Promise<import("@swc/core").Script>;
export declare function swcParseFileSync(code: string, options: any): import("@swc/core").Script;
