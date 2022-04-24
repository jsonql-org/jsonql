// develop the small functions here one by one
// import utils from '@jsonql/utils'
import {
  checkArray,
  checkObject,
} from '../../base'
import {
  notEmpty
} from '@jsonql/utils'
import {
  JsonqlValidationError
} from '@jsonql/errors'
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
export function normalizeInput(astMap: any, input?: any) {
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

/** generate an automatic valdiation rule using the AST map */
function createAutomaticRules(astMap: any) {


}

/** nomalize the object style rules input */
function normalizeObjectInput(astMap: any, input: any) {
  return astMap.map((ast: any, i: number)  => {
    
  })
}

/** normalize the array style rules input */
function normalizeArrayInput(astMap: any, input?: any) {
  // we use the astMap as standard
  return astMap.map((ast: any, i: number) => {


  })
}
