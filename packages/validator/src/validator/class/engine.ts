// develop the small functions here one by one
// import utils from '@jsonql/utils'
import {
  JsonqlPropertyParamnMap,
  JsonqlValidateFn
} from '../../types'

import {
  checkString,
  checkArray,
  checkObject,
  checkUnion,
  combineCheck,
} from '../../base'
import {
  notEmpty
} from '@jsonql/utils'
/*
import {
  JsonqlValidationError
} from '@jsonql/errors'
*/
import {
  TS_TYPE_NAME,
  TS_TYPE_REF,
  TS_TYPE_LIT,
  TS_ARRAY_TYPE,
  TS_UNION_TYPE,
} from '@jsonql/constants'

/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
*/

/**
This is the top level method to call,
Only deal with validating the input and divide the task
*/
export function normalizeInput(
  astMap: Array<JsonqlPropertyParamnMap>,
  input?: any
) {
  if (checkArray(input) && notEmpty(input)) {


  } else if (checkObject(input) && notEmpty(input)) {

  }
  // which means using the astMap to automatically validate
  return createAutomaticRules(astMap)
  /*
  throw new JsonqlValidationError(
    'normalizeInput',
    'input is not acceptable format!'
  )
  */
}

function getValidateRules(ast: any): JsonqlValidateFn {
  switch (ast[TS_TYPE_NAME]) {
    case TS_UNION_TYPE:
       return (value: any) => checkUnion(value, ast.type)
    case TS_ARRAY_TYPE:

    case TS_TYPE_REF:

    case TS_TYPE_LIT:

    default: // no tstype then should be primitive
      if (checkString(ast.type)) {
        return async (value: any) => combineCheck(ast.type)(value)
      }
  }
  throw new Error(`Unable to determine what is the type from ast map!`)
}

/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
export function createAutomaticRules(
  astMap: Array<JsonqlPropertyParamnMap>
) {
  return astMap.map((ast: JsonqlPropertyParamnMap) => {
    if (!ast.rules) {
      ast.rules = []
    }
    ast.rules = [getValidateRules(ast)]

    return ast
  })
}

/** nomalize the object style rules input */
export function normalizeObjectInput(
  astMap: Array<JsonqlPropertyParamnMap>,
  input: any
) {
  return astMap.map((ast: JsonqlPropertyParamnMap, i: number)  => {

  })
}

/** normalize the array style rules input */
export function normalizeArrayInput(
  astMap: Array<JsonqlPropertyParamnMap>,
  input?: any
) {
  // we use the astMap as standard
  return astMap.map((ast: any, i: number) => {


  })
}