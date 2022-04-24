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
export function normalizeInput(astMap: any, input: any = null) {
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

function createAutomaticRules(astMap: any) {


}


function normalizeObjectInput() {

}

function normalizeArrayInput() {
  // we use the astMap as standard
  return astMap.map((ast: any, i: number) => {


  })
}
