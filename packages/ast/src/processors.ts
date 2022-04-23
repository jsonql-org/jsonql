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
} from '@jsonql/constants'
import { NIL } from './constants'
import { stripSpan } from './common'

import { SwcProcessedModule }  from './types'

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

export function processFunctionModuleBody(module: SwcProcessedModule) {

  return module.body.filter((body: any) =>
    body.type === EXPORT_DEFAULT_TYPE
    &&
    body[DECLARATION_SHORT_NAME].type === FUNC_EXP
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

/** process the function argument params */
export function processArgParams(body: any) {
  if (body.params && Array.isArray(body.params)) {
    return {
      [body.identifier.value]: body.params
        .filter((param: any) => param.type === 'Parameter')
        .map((param: any) => {
          const { pat } = param

          return {
            name: pat.value,
            required: !pat.optional,
            type: extractTypeAnnotation(pat)
          }
        })
    }
  }
  // @TODO this could be a function without any arguments?
  throw new Error(`params not found in body!`)
}


/** processing the class methods arguments **/
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
    type: translateType(pat.right.type),
    value: extractValue(pat.right)
  }
}
/** extract value from the pat */
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
/** translate the type name from an AssignmentPattern */
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

/** wrap this in one method to make the code cleaner */
export function extractIdentifier(pat: any) {
  return {
    name: pat.value,
    required: !pat.optional,
    // there might not be a type annotation
    // @TODO need more scenario for testing
    type: extractTypeAnnotation(pat)
  }
}

// type annotation could have different field structures
export function extractTypeAnnotation(pat: any) {
  const annotation = pat?.typeAnnotation?.typeAnnotation
  if (annotation) {
    // simple type
    switch (annotation.type) {
      case TS_KEY_TYPE:
        return annotation.kind
      case TS_UNION_TYPE:
        return {
          [TS_TYPE_NAME]: TS_UNION_TYPE,
          // @TODO need futher processing to normal JS primitive type
          type: annotation.types.map((type: any) => type.kind)
        }
      case TS_ARRAY_TYPE:
        // console.log('--------------- out --------------')
        // console.dir(annotation, { depth: null })
        return {
          [TS_TYPE_NAME]: TS_ARRAY_TYPE,
          type: 'array',
          [ELEM_TYPE]: annotation[ELEM_TYPE].type,
          kind: annotation[ELEM_TYPE].kind,
        }
      case TS_TYPE_REF: // this is problematic one
        return {
          [TS_TYPE_NAME]: TS_TYPE_REF,
          type: 'object', // we treat them all as object regardless
          // keep this for reference
          [TYPE_NAME]: annotation[TYPE_NAME].value,
          [TYPE_PARAMS]: annotation[TYPE_PARAMS]
        }
      case TS_TYPE_LIT:
        return {
          [TS_TYPE_NAME]: TS_TYPE_LIT,
          type: 'object',
          memebers: Array.isArray(annotation.members) ?
            annotation.members.map((member: any) => stripSpan(member)) :
            stripSpan(annotation.members)
        }
      default: // @TODO should never got here
        return annotation
    }
  }
  // console.dir('could not find annonation', pat)
  return NIL
}
