"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTypeAnnotation = exports.extractIdentifier = exports.translateType = exports.extractValue = exports.extractAssignmentPattern = exports.processArgs = exports.processArgParams = exports.normalize = exports.processFunctionModuleBody = exports.processClassModuleBody = void 0;
// collection of processors
const constants_1 = require("@jsonql/constants");
const constants_2 = require("./constants");
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
function processFunctionModuleBody(module) {
    return module.body.filter((body) => body.type === constants_1.EXPORT_DEFAULT_TYPE
        &&
            body[constants_1.DECLARATION_SHORT_NAME].type === constants_1.FUNC_EXP);
}
exports.processFunctionModuleBody = processFunctionModuleBody;
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
/** process the function argument params */
function processArgParams(body) {
    if (body.params && Array.isArray(body.params)) {
        return {
            [body.identifier.value]: body.params
                .filter((param) => param.type === 'Parameter')
                .map((param) => {
                const { pat } = param;
                return {
                    name: pat.value,
                    required: !pat.optional,
                    type: extractTypeAnnotation(pat)
                };
            })
        };
    }
    // @TODO this could be a function without any arguments?
    throw new Error(`params not found in body!`);
}
exports.processArgParams = processArgParams;
/** processing the class methods arguments **/
function processArgs(classBody) {
    if (classBody.body) {
        return classBody.body
            .filter((body) => body.type === constants_1.CLASS_METHOD)
            .map((body) => {
            const propertyName = body.key.value;
            return {
                [propertyName]: body.function.params.map((params) => {
                    // console.dir(params,  { depth: null })
                    const { pat } = params;
                    switch (pat.type) {
                        case constants_1.ASSIGN_PATTERN:
                            return extractAssignmentPattern(pat);
                        default:
                            // type === 'Identifier'
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
// this is just assign a value without type info
function extractAssignmentPattern(pat) {
    // console.dir(pat, { depth: null })
    return {
        name: pat.left.value,
        required: !pat.optional,
        type: translateType(pat.right.type),
        value: extractValue(pat.right)
    };
}
exports.extractAssignmentPattern = extractAssignmentPattern;
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
/** translate the type name from an AssignmentPattern */
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
/** wrap this in one method to make the code cleaner */
function extractIdentifier(pat) {
    return {
        name: pat.value,
        required: !pat.optional,
        // there might not be a type annotation
        // @TODO need more scenario for testing
        type: extractTypeAnnotation(pat)
    };
}
exports.extractIdentifier = extractIdentifier;
// type annotation could have different field structures
function extractTypeAnnotation(pat) {
    var _a;
    const annotation = (_a = pat === null || pat === void 0 ? void 0 : pat.typeAnnotation) === null || _a === void 0 ? void 0 : _a.typeAnnotation;
    if (annotation) {
        // simple type
        switch (annotation.type) {
            case constants_1.TS_KEY_TYPE:
                return annotation.kind;
            case constants_1.TS_UNION_TYPE:
                return {
                    [constants_1.TS_TYPE_NAME]: constants_1.TS_UNION_TYPE,
                    // @TODO need futher processing to normal JS primitive type
                    type: annotation.types.map((type) => type.kind)
                };
            case constants_1.TS_ARRAY_TYPE:
                // console.log('--------------- out --------------')
                // console.dir(annotation, { depth: null })
                return {
                    [constants_1.TS_TYPE_NAME]: constants_1.TS_ARRAY_TYPE,
                    type: constants_1.ARRAY_TYPE,
                    [constants_1.ELEM_TYPE]: annotation[constants_1.ELEM_TYPE].type,
                    kind: annotation[constants_1.ELEM_TYPE].kind,
                };
            case constants_1.TS_TYPE_REF: // this is problematic one
                return {
                    [constants_1.TS_TYPE_NAME]: constants_1.TS_TYPE_REF,
                    type: constants_1.ANY_TYPE,
                    // keep this for reference
                    [constants_1.TYPE_NAME]: annotation[constants_1.TYPE_NAME].value,
                    [constants_1.TYPE_PARAMS]: annotation[constants_1.TYPE_PARAMS]
                };
            case constants_1.TS_TYPE_LIT:
                return {
                    [constants_1.TS_TYPE_NAME]: constants_1.TS_TYPE_LIT,
                    type: constants_1.ANY_TYPE,
                    memebers: Array.isArray(annotation.members) ?
                        annotation.members.map((member) => (0, common_1.stripSpan)(member)) :
                        (0, common_1.stripSpan)(annotation.members)
                };
            default: // @TODO should never got here
                return annotation;
        }
    }
    // console.dir('could not find annonation', pat)
    return constants_2.NIL;
}
exports.extractTypeAnnotation = extractTypeAnnotation;
