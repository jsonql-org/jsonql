// develop the small functions here one by one
// import utils from '@jsonql/utils'
import {
  JsonqlPropertyParamnMap,
  JsonqlValidateFn
} from '../types'
import {
  checkString,
  checkArray,
  checkAny,
  // checkObject,
  checkUnion,
  combineCheck,
} from '@jsonql/validator-core/src'
import {
  TS_TYPE_NAME,
  TS_TYPE_REF,
  TS_TYPE_LIT,
  TS_ARRAY_TYPE,
  TS_UNION_TYPE,
  DEFAULT_VALUE,
  SPREAD_ARG_TYPE,
} from '@jsonql/constants'

/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
all of these has moved to the ValidatorFactoryBase
because the plugins are apply there
*/

/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
export function createAutomaticRules(
  astMap: Array<JsonqlPropertyParamnMap>
): Array<JsonqlPropertyParamnMap> {
  return astMap.map((ast: JsonqlPropertyParamnMap) => {
    if (!ast.rules) {
      ast.rules = []
    }
    ast.rules = [getValidateRules(ast)]

    return ast
  })
}

/** only deal with constructing the basic rules validation fucntion */
function getValidateRules(ast: any): JsonqlValidateFn {
  switch (ast[TS_TYPE_NAME]) {
    case TS_UNION_TYPE:
    // @TODO need more test on different situation
      return async (value: any) => checkUnion(value, ast.type)
    case TS_ARRAY_TYPE:
      // need to apply for the type as well
      return async (value: Array<any>) => checkArray(value, ast.types)
    case TS_TYPE_REF || TS_TYPE_LIT:
    // @TODO should this get a special treatment
      return async (value: any) => checkAny(value)
    case SPREAD_ARG_TYPE: // it will be array but need the extended test
      // @TODO need to examine the input to see what more sutation could come up
      return async (value: Array<any>) => checkArray(value, ast.types)
    default: // no tstype then should be primitive
      if (checkString(ast.type)) {
        return async (value: any) => combineCheck(ast.type)(value)
      }
  }
  throw new Error(`Unable to determine type from ast map to create validator!`)
}

/** extract the default value if there is none */
export function getOptionalValue(arg: any, param: any) {
  if (arg !== undefined) {
    return arg
  }
  return (
    (
      param.optional === true ||
      param.required === false // this is the new SWC generate map
    )
    &&
    param[DEFAULT_VALUE] !== undefined
      ? param[DEFAULT_VALUE]
      : undefined
  )
}
