import { swcParserBase, swcParseFileBase, swcParseFileSync, swcParserSync } from './lib/swc-parser-base';
export { swcParserBase, swcParseFileBase, swcParseFileSync, swcParserSync };
/** just the core parser sync version */
export declare function tsBasicParserSync(filePath: string): import("@swc/core").Script;
/** parse ts file sync */
export declare function tsClassParserSync(infile: string): any;
/** This will pass the code directly for parsing */
export declare function tsFileParser(code: string): Promise<{
    [x: string]: ({
        name: string;
        required: boolean;
        type: string;
        defaultvalue: any;
    } | (import("./types").JsonqlParamInfo & {
        tstype: string;
    } & {
        type: any;
    }) | (import("./types").JsonqlParamInfo & {
        type: any;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        type?: undefined;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }))[];
}>;
/** The string version for individual function */
export declare function tsFileParserSync(code: string): import("@swc/core").Script;
/** deal with the function style resolver */
export declare function tsFunctionParser(infile: string): Promise<{
    [x: string]: ({
        name: string;
        required: boolean;
        type: string;
        defaultvalue: any;
    } | (import("./types").JsonqlParamInfo & {
        tstype: string;
    } & {
        type: any;
    }) | (import("./types").JsonqlParamInfo & {
        type: any;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        type?: undefined;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }))[];
}>;
/** parse ts file */
export declare function tsClassParser(infile: string): Promise<any>;
/** preconfig */
export declare function getParser(syntax: string, file?: boolean): (infile: string) => Promise<any>;
