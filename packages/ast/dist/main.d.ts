/** just the core parser sync version */
export declare function tsBasicParserSync(filePath: string): Promise<import("@swc/core").Script>;
/** This will pass the code directly for parsing */
export declare function tsFileParser(code: string): Promise<{
    [x: string]: ({
        name: string;
        required: boolean;
        type: string;
        defaultvalue: any;
    } | (import("./types").JsonqlParamInfo & {
        tstype: "TsUnionType";
    } & {
        type: any;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "array";
        types: any;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "any";
        typeParams: {
            typeName: any;
            typeParams: any;
        };
        types?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        type: any;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsArrayType";
        type: "array";
        types: any;
        typeParams: {
            elemType: any;
            kind: any;
            memebers?: undefined;
        };
    }) | (import("./types").JsonqlParamInfo & {
        type: "any";
        tstype: "TsTypeLiteral";
        typeParams: {
            memebers: any;
            elemType?: undefined;
            kind?: undefined;
        };
        types?: undefined;
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
        tstype: "TsUnionType";
    } & {
        type: any;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "array";
        types: any;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "any";
        typeParams: {
            typeName: any;
            typeParams: any;
        };
        types?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        type: any;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }) | (import("./types").JsonqlParamInfo & {
        tstype: "TsArrayType";
        type: "array";
        types: any;
        typeParams: {
            elemType: any;
            kind: any;
            memebers?: undefined;
        };
    }) | (import("./types").JsonqlParamInfo & {
        type: "any";
        tstype: "TsTypeLiteral";
        typeParams: {
            memebers: any;
            elemType?: undefined;
            kind?: undefined;
        };
        types?: undefined;
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
