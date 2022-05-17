import type { JsonqlPropertyParamMap, JsonqlValidateFn, JsonqlGenericObject } from '../types';
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
/**
this will get re-use in the class to create method for the queue execution
 */
export declare function constructRuleCb(name: string, ruleFn: JsonqlValidateFn, ruleName?: string): (value: any, lastResult: JsonqlGenericObject, pos: number[]) => Promise<any>;
/** This is taken out from the above then call for re-use when we want to fall through a rule */
export declare function successThen(name: string, value: any, lastResult: JsonqlGenericObject, pos: number[]): (result: any) => any;
/** check to see if the lastResult contain our lastResult package format or just their value */
export declare function isResultPackage(lastResult: any, key?: string): boolean;
/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
export declare function processValidateResults(argNames: Array<string>, validateResult: JsonqlGenericObject): Promise<any[]>;
/** final step to unwarp the pack result for spread arguments */
export declare function unwrapPreparedValidateResult(result: Array<any>): Promise<any>;
/** extract the default value if there is none */
export declare function getOptionalValue(arg: any, param: JsonqlGenericObject): any;
/** check plugin argument */
export declare function checkPluginArg(params: Array<string>): boolean;
/** check if the actually provide a func or pattern to construct function */
export declare function pluginHasFunc(rule: JsonqlGenericObject): boolean;
/** If the plugin provide a pattern and we construct a function out of it */
export declare function patternPluginFanctory(pattern: string): (value: string) => Promise<boolean>;
