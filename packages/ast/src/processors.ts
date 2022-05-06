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
  // this is new when we move here @0.5.4
  EXPORT_DEFAULT_TYPE,
  DECLARATION_NAME,
  DECLARATION_SHORT_NAME,
  CLASS_EXP,
  FUNC_EXP,
  // representing an object
  ELEM_TYPE,
  TYPE_NAME,
  TYPE_PARAMS,

  TS_KEY_TYPE,
  TS_UNION_TYPE,
  TS_TYPE_LIT,
  TS_ARRAY_TYPE,
  TS_TYPE_REF,
  TS_TYPE_NAME,
  // @0.2.0 instead of treating TS type as object (it could be something else) we treat them all as `any`
  ANY_TYPE,
  BOOLEAN_TYPE,
  STRING_TYPE,
  NUMBER_TYPE,
  ARRAY_TYPE,
  OBJECT_TYPE,

  DEFAULT_VALUE,
  SPREAD_ARG_TYPE,
} from '@jsonql/constants'
import { stripSpan } from './common'
import {
  SwcProcessedModule,
  SwcTypeParamsEntry,
  JsonqlParamInfo,
  SwcProcessedBody,
  SwcParameterEntry,
  SwcPatEntry,
}  from './types'

/** the first one to get call to take the body out from Class module */
export function processClassModuleBody(
  module: SwcProcessedModule
) {

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

/** processing the class methods arguments **/
export function processArgs(classBody: SwcProcessedBody) {
  if (classBody.body) {
    return classBody.body
      .filter((body: any) => body.type === CLASS_METHOD)
      .map((body: any) => {
        const propertyName = body.key.value
        return {
          [propertyName]: body.function.params.map((params: any) => {
            const { pat } = params
            switch (pat.type) {
              case ASSIGN_PATTERN:
                return extractAssignmentPattern(pat)
              case SPREAD_ARG_TYPE:
                return extractSpread(pat)
              default: // Identifier
                return extractIdentifier(pat)
            }
          })
        }
      })
      .reduce((a: any, b: any) => Object.assign(a, b), {})
  }

  throw new Error(`Could not find body within the class file`)
}

/* this is just assign a value without type info */
export function extractAssignmentPattern(pat: any) {
  // console.dir(pat, { depth: null })
  return {
    name: pat.left.value, // type === 'Identifier
    required: !pat.optional,
    type: translateType(pat.right.type),
    [DEFAULT_VALUE]: extractValue(pat.right),
  }
}
/** when the argument is a spread style */
export function extractSpread(pat: any) {{
  return Object.assign(
    extractTypeAnnotation(pat, {
      name: pat.argument.value,
      required: !pat.argument.optional,
    }),
    // we need to override the tstype to spread
    { [TS_TYPE_NAME]: SPREAD_ARG_TYPE }
  )
}}

/** The most common situation where it id as identifier  */
export function extractIdentifier(pat: any) {
  return extractTypeAnnotation(pat, {
    name: pat.value,
    required: !pat.optional,
    // there might not be a type annotation
    // @TODO need more scenario for testing
  })
}

// --------------------------------------------------------- //

/** extract ast from function expression */
export function processFunctionModuleBody(
  module: SwcProcessedModule
) {
  return module.body.filter((body: any) =>
    body.type === EXPORT_DEFAULT_TYPE
    &&
    body[DECLARATION_SHORT_NAME].type === FUNC_EXP
  )
}

/** process the function argument params */
export function processArgParams(body: SwcProcessedBody) {
  if (body.params && Array.isArray(body.params)) {
    return {
      [body.identifier.value]: body.params
        .filter((param: SwcParameterEntry) => param.type === 'Parameter')
        .map((param: SwcParameterEntry) => {
          const { pat } = param

          return extractTypeAnnotation(pat, {
            name: pat.value,
            required: !pat.optional,
          })
        })
    }
  }
  // @TODO this could be a function without any arguments?
  throw new Error(`params not found in body!`)
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


/** extract value from the pat */
export function extractValue(pat: SwcPatEntry) {
  switch (pat.type) {
    case ARR_EXP:
      return pat.elements
    case OBJ_EXP:
      return pat.properties
    default:
      return pat.value
  }
}
/** translate the ts type name from an AssignmentPattern */
export function translateType(swcType: string): string {
  switch (swcType) {
    case BOO_LIT:
      return BOOLEAN_TYPE
    case NUM_LIT:
      return NUMBER_TYPE
    case STR_LIT:
      return STRING_TYPE
    case ARR_EXP:
      return ARRAY_TYPE
    case OBJ_EXP:
      return OBJECT_TYPE
    default:
      return ANY_TYPE // always return a any type
  }
}

/* take the types value out from the params array */
export function extractArrayTypes(annotation: any) {
  const typeParams = annotation[TYPE_PARAMS].params
  // check the first one
  const firstEntry = typeParams[0]
  switch (firstEntry.type) {
    case TS_UNION_TYPE:
      return firstEntry.types.map((type: SwcTypeParamsEntry) => type.kind)
    default:
      return firstEntry.kind
  }
}

/**
The tstype: TsTypeReference is a very problematic one,
we need to further process it
*/
export function furtherProcessReferenceType(annotation: any) {
  const typeName = (annotation[TYPE_NAME].value).toLowerCase()
  switch (typeName) {
    case ARRAY_TYPE:
      return {
        type: ARRAY_TYPE,
        types: extractArrayTypes(annotation)
      }
    default:
      return {
        type: ANY_TYPE, // we treat them all as object regardless
        // keep this for reference
        [TYPE_PARAMS]: {
          [TYPE_NAME]: annotation[TYPE_NAME].value,
          [TYPE_PARAMS]: annotation[TYPE_PARAMS]
        }
      }
  }
}

/**
in situtation where the Union type form with complex types
*/
export function furtherProcessUnionType(annotation: any) {

  return {
    type: annotation.types.map((entry: any) => {
      switch (entry.type) {
        case TS_TYPE_REF:
          return furtherProcessReferenceType(entry)
        case TS_KEY_TYPE:
        default:
          return entry.kind
      }
    })
  }
}

// type annotation could have different field structures
export function extractTypeAnnotation(
  pat: SwcPatEntry,
  base: JsonqlParamInfo
) {
  const annotation = pat?.typeAnnotation?.typeAnnotation
  const value = (function(annotation) {
    if (annotation) {
      switch (annotation.type) {
        case TS_KEY_TYPE:
          return {type: annotation.kind}
        case TS_UNION_TYPE:
          // console.dir(annotation, { depth: null })
          return Object.assign(
            { [TS_TYPE_NAME]: TS_UNION_TYPE },
            furtherProcessUnionType(annotation)
          )
        case TS_ARRAY_TYPE:
          return {
            [TS_TYPE_NAME]: TS_ARRAY_TYPE,
            type: ARRAY_TYPE,
            types: annotation[ELEM_TYPE].kind,
            [TYPE_PARAMS]: {
              [ELEM_TYPE]: annotation[ELEM_TYPE].type,
              kind: annotation[ELEM_TYPE].kind,
            }
          }
        // this is problematic one
        // It could be a declare type also an Array<> could fall here
        case TS_TYPE_REF:
          return Object.assign(
            { [TS_TYPE_NAME]: TS_TYPE_REF },
            furtherProcessReferenceType(annotation)
          )
        case TS_TYPE_LIT:
          return {
            type: ANY_TYPE,
            [TS_TYPE_NAME]: TS_TYPE_LIT,
            [TYPE_PARAMS]: {
              memebers: Array.isArray(annotation.members) ?
                annotation.members.map((member: any) => stripSpan(member)) :
                stripSpan(annotation.members)
              }
            }
        default: // @TODO should never got here
          console.error(`Something went very wrong in processor.ts`, annotation)
          // return {}
      }
    }
    return {}
  })(annotation)

  // console.dir('could not find annonation', pat)
  return Object.assign(base, value)
}
