// for generate ast with SWC
export const EXPORT_TYPE = 'ExportDeclaration'
export const EXPORT_DEFAULT_TYPE = 'ExportDefaultDeclaration'

export const DECLARATION_NAME = 'declaration'
export const DECLARATION_SHORT_NAME = 'decl'
export const ANNOTATION_NAME = 'typeAnnotation'

export const CLASS_TYPE = 'ClassDeclaration'
export const CLASS_METHOD = 'ClassMethod'
// why swc came out with different key?
export const CLASS_EXP = 'ClassExpression'

export const ASSIGN_PATTERN = 'AssignmentPattern'

export const OBJ_EXP = 'ObjectExpression'
export const ARR_EXP = 'ArrayExpression'
export const BOO_LIT = 'BooleanLiteral'
export const NUM_LIT = 'NumericLiteral'
export const STR_LIT = 'StringLiteral'
// this is not very good but it's a key word from swc
export const ELEM_TYPE = 'elemType'

export const TS_KEY_TYPE = 'TsKeywordType'
export const TS_UNION_TYPE = 'TsUnionType'
export const TS_ARRAY_TYPE = 'TsArrayType'

export const TS_ANNO_NAME = 'TsTypeAnnotation'
// when they type inline along the params
export const TS_TYPE_LIT = 'TsTypeLiteral'
// when pass a type reference we just treat them as object
export const TS_TYPE_REF = 'TsTypeReference'
