import { SwcProcessedModule, JsonqlParamInfo } from './types';
/** the first one to get call to take the body out from Class module */
export declare function processClassModuleBody(module: SwcProcessedModule): any;
/** processing the class methods arguments **/
export declare function processArgs(classBody: any): any;
/** extract ast from function expression */
export declare function processFunctionModuleBody(module: SwcProcessedModule): any;
/** process the function argument params */
export declare function processArgParams(body: any): {
    [x: number]: any;
};
export declare function normalize(body: Array<any>): any;
export declare function extractAssignmentPattern(pat: any): {
    name: any;
    required: boolean;
    type: string;
    defaultvalue: any;
};
/** extract value from the pat */
export declare function extractValue(pat: any): any;
/** translate the ts type name from an AssignmentPattern */
export declare function translateType(swcType: string): string;
/** wrap this in one method to make the code cleaner */
export declare function extractIdentifier(pat: any): JsonqlParamInfo & (({
    tstype: "TsUnionType";
} & {
    type: any;
}) | ({
    tstype: "TsTypeReference";
} & {
    type: "array";
    types: any;
    typeParams?: undefined;
}) | ({
    tstype: "TsTypeReference";
} & {
    type: "any";
    typeParams: {
        typeName: any;
        typeParams: any;
    };
    types?: undefined;
}) | {
    type: any;
    tstype?: undefined;
    types?: undefined;
    typeParams?: undefined;
} | {
    tstype: "TsArrayType";
    type: "array";
    types: any;
    typeParams: {
        elemType: any;
        kind: any;
        memebers?: undefined;
    };
} | {
    type: "any";
    tstype: "TsTypeLiteral";
    typeParams: {
        memebers: any;
        elemType?: undefined;
        kind?: undefined;
    };
    types?: undefined;
} | {
    type?: undefined;
    tstype?: undefined;
    types?: undefined;
    typeParams?: undefined;
});
export declare function extractArrayTypes(annotation: any): any;
/**
The tstype: TsTypeReference is a very problematic one,
we need to further process it
*/
export declare function furtherProcessReferenceType(annotation: any): {
    type: "array";
    types: any;
    typeParams?: undefined;
} | {
    type: "any";
    typeParams: {
        typeName: any;
        typeParams: any;
    };
    types?: undefined;
};
/**
in situtation where the Union type form with complex types
*/
export declare function furtherProcessUnionType(annotation: any): {
    type: any;
};
export declare function extractTypeAnnotation(pat: any, base: JsonqlParamInfo): JsonqlParamInfo & (({
    tstype: "TsUnionType";
} & {
    type: any;
}) | ({
    tstype: "TsTypeReference";
} & {
    type: "array";
    types: any;
    typeParams?: undefined;
}) | ({
    tstype: "TsTypeReference";
} & {
    type: "any";
    typeParams: {
        typeName: any;
        typeParams: any;
    };
    types?: undefined;
}) | {
    type: any;
    tstype?: undefined;
    types?: undefined;
    typeParams?: undefined;
} | {
    tstype: "TsArrayType";
    type: "array";
    types: any;
    typeParams: {
        elemType: any;
        kind: any;
        memebers?: undefined;
    };
} | {
    type: "any";
    tstype: "TsTypeLiteral";
    typeParams: {
        memebers: any;
        elemType?: undefined;
        kind?: undefined;
    };
    types?: undefined;
} | {
    type?: undefined;
    tstype?: undefined;
    types?: undefined;
    typeParams?: undefined;
});
