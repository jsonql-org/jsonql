"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTypeAnnotation = exports.furtherProcessUnionType = exports.furtherProcessReferenceType = exports.extractArrayTypes = exports.translateType = exports.extractValue = exports.normalize = exports.processArgParams = exports.processFunctionModuleBody = exports.extractIdentifier = exports.extractSpread = exports.extractAssignmentPattern = exports.processArgs = exports.processClassModuleBody = void 0;
// collection of processors
const constants_1 = require("@jsonql/constants");
const common_1 = require("./common");
/** the first one to get call to take the body out from Class module */
function processClassModuleBody(module) {
    return module
        .body
        .filter((body) => {
        var _a;
        return body.type === constants_1.CLASS_TYPE
            ||
                (body.type === constants_1.EXPORT_TYPE
                    &&
                        ((_a = body[constants_1.DECLARATION_NAME]) === null || _a === void 0 ? void 0 : _a.type) === constants_1.CLASS_TYPE)
            || // this is a new situation
                (body.type === constants_1.EXPORT_DEFAULT_TYPE
                    &&
                        body[constants_1.DECLARATION_SHORT_NAME].type === constants_1.CLASS_EXP);
    });
}
exports.processClassModuleBody = processClassModuleBody;
/** processing the class methods arguments **/
function processArgs(classBody) {
    if (classBody.body) {
        return classBody.body
            .filter((body) => body.type === constants_1.CLASS_METHOD)
            .map((body) => {
            const propertyName = body.key.value;
            return {
                [propertyName]: body.function.params.map((params) => {
                    const { pat } = params;
                    switch (pat.type) {
                        case constants_1.ASSIGN_PATTERN:
                            return extractAssignmentPattern(pat);
                        case constants_1.SPREAD_ARG_TYPE:
                            return extractSpread(pat);
                        default: // Identifier
                            return extractIdentifier(pat);
                    }
                })
            };
        })
            .reduce((a, b) => Object.assign(a, b), {});
    }
    throw new Error(`Could not find body within the class file`);
}
exports.processArgs = processArgs;
/* this is just assign a value without type info */
function extractAssignmentPattern(pat) {
    // console.dir(pat, { depth: null })
    return {
        name: pat.left.value,
        required: (pat.optional !== undefined) ? !pat.optional : !pat.left.optional,
        type: translateType(pat.right.type),
        [constants_1.DEFAULT_VALUE]: extractValue(pat.right),
    };
}
exports.extractAssignmentPattern = extractAssignmentPattern;
/** when the argument is a spread style */
function extractSpread(pat) {
    {
        return Object.assign(extractTypeAnnotation(pat, {
            name: pat.argument.value,
            required: !pat.argument.optional,
        }), 
        // we need to override the tstype to spread
        { [constants_1.TS_TYPE_NAME]: constants_1.SPREAD_ARG_TYPE });
    }
}
exports.extractSpread = extractSpread;
/** The most common situation where it id as identifier  */
function extractIdentifier(pat) {
    return extractTypeAnnotation(pat, {
        name: pat.value,
        required: !pat.optional,
        // there might not be a type annotation
        // @TODO need more scenario for testing
    });
}
exports.extractIdentifier = extractIdentifier;
// --------------------------------------------------------- //
/** extract ast from function expression */
function processFunctionModuleBody(module) {
    return module.body.filter((body) => body.type === constants_1.EXPORT_DEFAULT_TYPE
        &&
            body[constants_1.DECLARATION_SHORT_NAME].type === constants_1.FUNC_EXP);
}
exports.processFunctionModuleBody = processFunctionModuleBody;
/** process the function argument params */
function processArgParams(body) {
    if (body.params && Array.isArray(body.params)) {
        return {
            [body.identifier.value]: body.params
                .filter((param) => param.type === constants_1.PARAMETER_NAME)
                .map((param) => {
                const { pat } = param;
                switch (pat.type) {
                    case constants_1.ASSIGN_PATTERN:
                        return extractAssignmentPattern(pat);
                    case constants_1.SPREAD_ARG_TYPE:
                        return extractSpread(pat);
                    default:
                        return extractIdentifier(pat);
                }
            })
        };
    }
    // @TODO this could be a function without any arguments?
    throw new Error(`params not found in body!`);
}
exports.processArgParams = processArgParams;
// strip out the module.body.body to make the structure the same to work with
function normalize(body) {
    if (body.length) {
        return body.map((code) => {
            switch (code.type) {
                case constants_1.EXPORT_TYPE:
                    return code[constants_1.DECLARATION_NAME];
                case constants_1.EXPORT_DEFAULT_TYPE:
                    return code[constants_1.DECLARATION_SHORT_NAME];
                default:
                    return code;
            }
        })[0];
    }
    // console.dir(body, { depth: null })
    throw new Error(`Could not find any code to work with!`);
}
exports.normalize = normalize;
/** extract value from the pat */
function extractValue(pat) {
    switch (pat.type) {
        case constants_1.ARR_EXP:
            return pat.elements;
        case constants_1.OBJ_EXP:
            return pat.properties;
        default:
            return pat.value;
    }
}
exports.extractValue = extractValue;
/** translate the ts type name from an AssignmentPattern */
function translateType(swcType) {
    switch (swcType) {
        case constants_1.BOO_LIT:
            return constants_1.BOOLEAN_TYPE;
        case constants_1.NUM_LIT:
            return constants_1.NUMBER_TYPE;
        case constants_1.STR_LIT:
            return constants_1.STRING_TYPE;
        case constants_1.ARR_EXP:
            return constants_1.ARRAY_TYPE;
        case constants_1.OBJ_EXP:
            return constants_1.OBJECT_TYPE;
        default:
            return constants_1.ANY_TYPE; // always return a any type
    }
}
exports.translateType = translateType;
/* take the types value out from the params array */
function extractArrayTypes(annotation) {
    const typeParams = annotation[constants_1.TYPE_PARAMS].params;
    // check the first one
    const firstEntry = typeParams[0];
    switch (firstEntry.type) {
        case constants_1.TS_UNION_TYPE:
            return firstEntry.types.map((type) => type.kind);
        default:
            return firstEntry.kind;
    }
}
exports.extractArrayTypes = extractArrayTypes;
/**
The tstype: TsTypeReference is a very problematic one,
we need to further process it
*/
function furtherProcessReferenceType(annotation) {
    const typeName = (annotation[constants_1.TYPE_NAME].value).toLowerCase();
    switch (typeName) {
        case constants_1.ARRAY_TYPE:
            return {
                type: constants_1.ARRAY_TYPE,
                types: extractArrayTypes(annotation)
            };
        default:
            return {
                type: constants_1.ANY_TYPE,
                // keep this for reference
                [constants_1.TYPE_PARAMS]: {
                    [constants_1.TYPE_NAME]: annotation[constants_1.TYPE_NAME].value,
                    [constants_1.TYPE_PARAMS]: annotation[constants_1.TYPE_PARAMS]
                }
            };
    }
}
exports.furtherProcessReferenceType = furtherProcessReferenceType;
/**
in situtation where the Union type form with complex types
*/
function furtherProcessUnionType(annotation) {
    return {
        type: annotation.types.map((entry) => {
            switch (entry.type) {
                case constants_1.TS_TYPE_REF:
                    return furtherProcessReferenceType(entry);
                case constants_1.TS_KEY_TYPE:
                default:
                    return entry.kind;
            }
        })
    };
}
exports.furtherProcessUnionType = furtherProcessUnionType;
// type annotation could have different field structures
function extractTypeAnnotation(pat, base) {
    var _a;
    const annotation = (_a = pat === null || pat === void 0 ? void 0 : pat.typeAnnotation) === null || _a === void 0 ? void 0 : _a.typeAnnotation;
    const value = (function (annotation) {
        if (annotation) {
            switch (annotation.type) {
                case constants_1.TS_KEY_TYPE:
                    return { type: annotation.kind };
                case constants_1.TS_UNION_TYPE:
                    // console.dir(annotation, { depth: null })
                    return Object.assign({ [constants_1.TS_TYPE_NAME]: constants_1.TS_UNION_TYPE }, furtherProcessUnionType(annotation));
                case constants_1.TS_ARRAY_TYPE:
                    return {
                        [constants_1.TS_TYPE_NAME]: constants_1.TS_ARRAY_TYPE,
                        type: constants_1.ARRAY_TYPE,
                        types: annotation[constants_1.ELEM_TYPE].kind,
                        [constants_1.TYPE_PARAMS]: {
                            [constants_1.ELEM_TYPE]: annotation[constants_1.ELEM_TYPE].type,
                            kind: annotation[constants_1.ELEM_TYPE].kind,
                        }
                    };
                // this is problematic one
                // It could be a declare type also an Array<> could fall here
                case constants_1.TS_TYPE_REF:
                    return Object.assign({ [constants_1.TS_TYPE_NAME]: constants_1.TS_TYPE_REF }, furtherProcessReferenceType(annotation));
                case constants_1.TS_TYPE_LIT:
                    return {
                        type: constants_1.ANY_TYPE,
                        [constants_1.TS_TYPE_NAME]: constants_1.TS_TYPE_LIT,
                        [constants_1.TYPE_PARAMS]: {
                            memebers: Array.isArray(annotation.members) ?
                                annotation.members.map((member) => (0, common_1.stripSpan)(member)) :
                                (0, common_1.stripSpan)(annotation.members)
                        }
                    };
                default: // @TODO should never got here
                    console.error(`Something went very wrong in processor.ts`, annotation);
                // return {}
            }
        }
        return {};
    })(annotation);
    // console.dir('could not find annonation', pat)
    return Object.assign(base, value);
}
exports.extractTypeAnnotation = extractTypeAnnotation;
