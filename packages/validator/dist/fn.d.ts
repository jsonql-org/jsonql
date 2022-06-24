import type { JsonqlPropertyParamMap } from './types';
import type { JsonqlGenericObject, JsonqlValidationRule } from '@jsonql/validator-core/index';
import type { AnyTypeArr } from '@jsonql/utils/index';
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
export declare function createAutomaticRules(astMap: Array<JsonqlPropertyParamMap>): Array<JsonqlPropertyParamMap>;
/** wrapper method to wrap two steps together to make the class call easier to understand */
export declare function processValidateResultsAsArr(argNames: Array<string>, validateResult: JsonqlGenericObject): Promise<any>;
/** step to process the return result as object */
export declare function processValidateResultsAsObj(argNames: Array<string>, validateResult: JsonqlGenericObject): JsonqlGenericObject;
/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
export declare function processValidateResults(argNames: Array<string>, validateResult: JsonqlGenericObject): Promise<any[]>;
/** step to process the return result as object */
export declare function processValidateResultsAsArrOfObj(argNames: Array<string>, validateResult: JsonqlGenericObject): Array<JsonqlGenericObject>;
/** final step to unwarp the pack result for spread arguments */
export declare function unwrapPreparedValidateResult(result: AnyTypeArr): Promise<any>;
/** extract the default value if there is none */
export declare function getOptionalValue(arg: unknown, param: JsonqlGenericObject): any;
/** check if the rule contain duplicate rules that can not be resolve */
export declare function checkDuplicateRules(rule: JsonqlValidationRule): Array<string>;
/** take the key part from a one level object */
export declare function getKey(obj: JsonqlGenericObject): string | undefined;
