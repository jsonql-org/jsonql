import { SwcProcessedModule, JsonqlParamInfo, SwcProcessedBody, SwcPatEntry } from '../types';
/** the first one to get call to take the body out from Class module */
export declare function processClassModuleBody(module: SwcProcessedModule): any;
/** processing the class methods arguments **/
export declare function processArgs(classBody: SwcProcessedBody): any;
export declare function extractAssignmentPattern(pat: SwcPatEntry): {
    name: string;
    required: boolean;
    type: string;
    defaultvalue: any;
};
/** when the argument is a spread style */
export declare function extractSpread(pat: SwcPatEntry): never;
/** The most common situation where it id as identifier  */
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
/** extract ast from function expression */
export declare function processFunctionModuleBody(module: SwcProcessedModule): any;
/** process the function argument params */
export declare function processArgParams(body: SwcProcessedBody): {
    [x: string]: ({
        name: string;
        required: boolean;
        type: string;
        defaultvalue: any;
    } | (JsonqlParamInfo & {
        tstype: "TsUnionType";
    } & {
        type: any;
    }) | (JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "array";
        types: any;
        typeParams?: undefined;
    }) | (JsonqlParamInfo & {
        tstype: "TsTypeReference";
    } & {
        type: "any";
        typeParams: {
            typeName: any;
            typeParams: any;
        };
        types?: undefined;
    }) | (JsonqlParamInfo & {
        type: any;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }) | (JsonqlParamInfo & {
        tstype: "TsArrayType";
        type: "array";
        types: any;
        typeParams: {
            elemType: any;
            kind: any;
            memebers?: undefined;
        };
    }) | (JsonqlParamInfo & {
        type: "any";
        tstype: "TsTypeLiteral";
        typeParams: {
            memebers: any;
            elemType?: undefined;
            kind?: undefined;
        };
        types?: undefined;
    }) | (JsonqlParamInfo & {
        type?: undefined;
        tstype?: undefined;
        types?: undefined;
        typeParams?: undefined;
    }))[];
};
export declare function normalize(body: Array<any>): any;
/** extract value from the pat */
export declare function extractValue(pat: SwcPatEntry): any;
/** translate the ts type name from an AssignmentPattern */
export declare function translateType(swcType: string): string;
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
export declare function extractTypeAnnotation(pat: SwcPatEntry, base: JsonqlParamInfo): JsonqlParamInfo & (({
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
