"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VALUE = exports.OBJECT_TYPE = exports.ARRAY_TYPE = exports.NUMBER_TYPE = exports.STRING_TYPE = exports.BOOLEAN_TYPE = exports.ANY_TYPE = exports.SPREAD_ARG_TYPE = exports.TS_TYPE_NAME = exports.TS_TYPE_REF = exports.TS_TYPE_LIT = exports.TS_ANNO_NAME = exports.TS_ARRAY_TYPE = exports.TS_UNION_TYPE = exports.TS_KEY_TYPE = exports.TYPE_PARAMS = exports.TYPE_NAME = exports.ELEM_TYPE = exports.STR_LIT = exports.NUM_LIT = exports.BOO_LIT = exports.ARR_EXP = exports.OBJ_EXP = exports.ASSIGN_PATTERN = exports.FUNC_EXP = exports.CLASS_EXP = exports.CLASS_METHOD = exports.CLASS_TYPE = exports.PARAMETER_NAME = exports.ANNOTATION_NAME = exports.DECLARATION_SHORT_NAME = exports.DECLARATION_NAME = exports.EXPORT_DEFAULT_TYPE = exports.EXPORT_TYPE = exports.NIL = exports.SYNTAXS = exports.IS_DEBUG = void 0;
exports.IS_DEBUG = process.env.DEBUG;
exports.SYNTAXS = { ts: "typescript", js: "ecmascript" };
exports.NIL = 'nil';
// move all this constants back from @jsonql/constants
// for generate ast with SWC
exports.EXPORT_TYPE = 'ExportDeclaration';
exports.EXPORT_DEFAULT_TYPE = 'ExportDefaultDeclaration';
exports.DECLARATION_NAME = 'declaration';
exports.DECLARATION_SHORT_NAME = 'decl';
exports.ANNOTATION_NAME = 'typeAnnotation';
exports.PARAMETER_NAME = 'Parameter';
exports.CLASS_TYPE = 'ClassDeclaration';
exports.CLASS_METHOD = 'ClassMethod';
// why swc came out with different key?
exports.CLASS_EXP = 'ClassExpression';
exports.FUNC_EXP = 'FunctionExpression';
exports.ASSIGN_PATTERN = 'AssignmentPattern';
exports.OBJ_EXP = 'ObjectExpression';
exports.ARR_EXP = 'ArrayExpression';
exports.BOO_LIT = 'BooleanLiteral';
exports.NUM_LIT = 'NumericLiteral';
exports.STR_LIT = 'StringLiteral';
// this is not very good but it's a key word from swc
exports.ELEM_TYPE = 'elemType';
// when this is the TsTypeReference
exports.TYPE_NAME = 'typeName';
exports.TYPE_PARAMS = 'typeParams';
exports.TS_KEY_TYPE = 'TsKeywordType';
exports.TS_UNION_TYPE = 'TsUnionType';
exports.TS_ARRAY_TYPE = 'TsArrayType';
exports.TS_ANNO_NAME = 'TsTypeAnnotation';
// when they type inline along the params
exports.TS_TYPE_LIT = 'TsTypeLiteral';
// when pass a type reference we just treat them as object
exports.TS_TYPE_REF = 'TsTypeReference';
// this is for us to id what that is
exports.TS_TYPE_NAME = 'tstype';
exports.SPREAD_ARG_TYPE = 'RestElement';
// from valdiator
exports.ANY_TYPE = 'any';
exports.BOOLEAN_TYPE = 'boolean';
exports.STRING_TYPE = 'string';
exports.NUMBER_TYPE = 'number';
exports.ARRAY_TYPE = 'array';
exports.OBJECT_TYPE = 'object';
exports.DEFAULT_VALUE = 'defaultvalue';
