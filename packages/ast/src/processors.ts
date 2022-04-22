// collection of processors
import {
  CLASS_TYPE,
  EXPORT_TYPE,
  CLASS_METHOD,
  ASSIGN_PATTERN,
  OBJ_EXP,
  ARR_EXP,
  BOO_LIT,
  NUM_LIT,
  STR_LIT,
  KEY_TYPE,
  UNION_TYPE,
  // this is new when we move here @0.5.4
  EXPORT_DEFAULT_TYPE,
  DECLARATION_NAME,
  DECLARATION_SHORT_NAME,
  CLASS_EXP
} from '@jsonql/constants'
const NIL = 'nil'

declare type SwcProcessedModule = {
  type: string
  span: { [key: string]: number | string }
  body: { [key: string]: any }
  interpreter: null
}

/** the first one to get call to take the body out from Class module */
export function processClassModuleBody(module: SwcProcessedModule) {

  return module
    .body
    .filter((body: any) =>
      body.type === CLASS_TYPE
      ||
      (
        body.type === EXPORT_TYPE
        &&
        body[DECLARATION_NAME]?.type === CLASS_TYPE
      )
      || // this is a new situation
      (
        body.type === EXPORT_DEFAULT_TYPE
        &&
        body[DECLARATION_SHORT_NAME].type === CLASS_EXP
      )
    )
}

// strip out the module.body.body to make the structure the same to work with
export function normalize(body: Array<any>) {
  if (body.length) {
    return body.map((code) => {
      switch (code.type) {
        case EXPORT_TYPE:
          return code[DECLARATION_NAME]
        case EXPORT_DEFAULT_TYPE:
          return code[DECLARATION_SHORT_NAME]
        default:
          return code
      }
    })[0]
  }
  // console.dir(body, { depth: null })
  throw new Error(`Could not find any code to work with!`)
}

// break this out from above to processing the arguments
export function processArgs(classBody: any) {
  if (classBody.body) {
    return classBody.body
      .filter((body: any) => body.type === CLASS_METHOD)
      .map((body: any) => {
        const propertyName = body.key.value
        return {
          [propertyName]: body.function.params.map((params: any) => {
            // console.dir(params,  { depth: null })
            const { pat } = params
            switch (pat.type) {
              case ASSIGN_PATTERN:
                return extractAssignmentPattern(pat)
              default:
                // type === 'Identifier'
                return extractIdentifier(pat)
            }
          })
        }
      })
      .reduce((a: any, b: any) => Object.assign(a, b), {})
  }

  throw new Error(`Could not find body within the class file`)
}

// this is just assign a value without type info
export function extractAssignmentPattern(pat: any) {
  // console.dir(pat, { depth: null })
  return {
    name: pat.left.value, // type === 'Identifier
    required: !pat.optional,
    types: translateType(pat.right.type),
    value: extractValue(pat.right)
  }
}
// extract the value from the AssignmentPattern
/* examples: @TODO
auto = [1]
{
        type: 'ArrayExpression',
        span: { start: 748, end: 751, ctxt: 0 },
        elements: [
          {
            spread: null,
            expression: {
              type: 'NumericLiteral',
              span: { start: 749, end: 750, ctxt: 0 },
              value: 1,
              raw: '1'
            }
          }
        ]
      }
auto = []
{
        type: 'ArrayExpression',
        span: { start: 748, end: 750, ctxt: 0 },
        elements: []
      }

auto = {}

{
        type: 'ObjectExpression',
        span: { start: 748, end: 750, ctxt: 0 },
        properties: []
      }

auto={a: 1}

{
        type: 'ObjectExpression',
        span: { start: 748, end: 754, ctxt: 0 },
        properties: [
          {
            type: 'KeyValueProperty',
            key: {
              type: 'Identifier',
              span: { start: 749, end: 750, ctxt: 0 },
              value: 'a',
              optional: false
            },
            value: {
              type: 'NumericLiteral',
              span: { start: 752, end: 753, ctxt: 0 },
              value: 1,
              raw: '1'
            }
          }
        ]
      }
*/
export function extractValue(pat: any) {
  switch (pat.type) {
    case ARR_EXP:
      return pat.elements
    case OBJ_EXP:
      return pat.properties
    default:
      return pat.value
  }
}
// translate the type name from an AssignmentPattern
export function translateType(swcType: string): string {
  switch (swcType) {
    case BOO_LIT:
      return 'boolean'
    case NUM_LIT:
      return 'number'
    case STR_LIT:
      return 'string'
    case ARR_EXP:
      return 'array'
    case OBJ_EXP:
      return 'object'
    default:
      return swcType
  }
}


// wrap this in one method to make the code cleaner
export function extractIdentifier(pat: any) {
  return {
    name: pat.value,
    required: !pat.optional,
    // there might not be a type annotation
    // @TODO need more scenario for testing
    types: extractTypeAnnotation(pat)
  }
}

// type annotation could have different field structures
export function extractTypeAnnotation(pat: any) {
  const annotation = pat?.typeAnnotation?.typeAnnotation
  if (annotation) {
    // simple type
    switch (annotation.type) {
      case KEY_TYPE:
        return { type: annotation.kind }
      case UNION_TYPE:
        return {
          type: UNION_TYPE,
          // @TODO need futher processing
          types: annotation.types.map((type: any) => type.kind)
        }
      default: // @TODO
        return annotation
    }
  }
  // console.dir('could not find annonation', pat)
  return NIL
}
/*
when pass something like this
type DummyObj = { [key: string]: number }
(arg4?: DummyObj)

{
  type: 'Parameter',
  span: { start: 218, end: 233, ctxt: 0 },
  decorators: [],
  pat: {
    type: 'Identifier',
    span: { start: 218, end: 233, ctxt: 0 },
    value: 'arg4',
    optional: true,
    typeAnnotation: {
      type: 'TsTypeAnnotation',
      span: { start: 223, end: 233, ctxt: 0 },
      typeAnnotation: {
        type: 'TsTypeReference',
        span: { start: 225, end: 233, ctxt: 0 },
        typeName: {
          type: 'Identifier',
          span: { start: 225, end: 233, ctxt: 0 },
          value: 'DummyObj',
          optional: false
        },
        typeParams: null
      }
    }
  }
}
*/

/*
when it's something like this

(arg4?: {[key: string]: number})

typeAnnotation: {
  type: 'TsTypeAnnotation',
  span: { start: 170, end: 195, ctxt: 0 },
  typeAnnotation: {
    type: 'TsTypeLiteral',
    span: { start: 172, end: 195, ctxt: 0 },
    members: [
      {
        type: 'TsIndexSignature',
        params: [
          {
            type: 'Identifier',
            span: { start: 174, end: 185, ctxt: 0 },
            value: 'key',
            optional: false,
            typeAnnotation: {
              type: 'TsTypeAnnotation',
              span: { start: 177, end: 185, ctxt: 0 },
              typeAnnotation: {
                type: 'TsKeywordType',
                span: { start: 179, end: 185, ctxt: 0 },
                kind: 'string'
              }
            }
          }
        ],
        typeAnnotation: {
          type: 'TsTypeAnnotation',
          span: { start: 186, end: 194, ctxt: 0 },
          typeAnnotation: {
            type: 'TsKeywordType',
            span: { start: 188, end: 194, ctxt: 0 },
            kind: 'number'
          }
        },
        readonly: false,
        static: false,
        span: { start: 173, end: 194, ctxt: 0 }
      }
    ]
  }
*/


/** remove all the span props they are no use to us */
export function stripSpan(obj: any) {
  const tmp = {}
  for (const key in obj) {
    if (key !== 'span') {
      if (Array.isArray(obj[key])) {
        tmp[key] = obj[key].map((o: any) => {
          if (typeof o === 'object') {
            return stripSpan(o)
          }
          return o
        })
      } else if (typeof obj[key] === 'object') {
        tmp[key] = stripSpan(obj[key])
      } else {
        tmp[key] = obj[key]
      }
    }
  }
  return tmp
}
