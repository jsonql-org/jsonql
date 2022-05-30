import type { JsonqlValidateFn, JsonqlGenericObject, JsonqlPluginConfig } from '../types';
/** check plugin argument against keywords list */
export declare function checkPluginArg(params: Array<string>): boolean;
/** now simply it with just one prop check main */
export declare function pluginHasFunc(rule: Partial<JsonqlPluginConfig>): boolean;
/** instead of just checking the user params, we go one step further to extract it for them */
export declare function searchParamsKey(rule: Partial<JsonqlPluginConfig>): Partial<JsonqlPluginConfig>;
/** check if the params they provide is matching their main method */
export declare function paramMatches(rule: Partial<JsonqlPluginConfig>): boolean;
/** take a function string and return its argument names */
export declare function extractFnArgs(fnStr: string): Array<string>;
/**
this will get re-use in the class to create method for the queue execution
 */
export declare function constructRuleCb(argName: string, ruleFn: JsonqlValidateFn, ruleName?: string): (value: unknown, lastResult: JsonqlGenericObject, pos: number[]) => Promise<any>;
/** This is taken out from the above then call for re-use when we want to fall through a rule */
export declare function successThen(argName: string, value: unknown, lastResult: JsonqlGenericObject, pos: number[]): (result: unknown) => any;
/** check to see if the lastResult contain our lastResult package format or just their value */
export declare function isResultPackage(lastResult: unknown, key?: string): boolean;
/** If the plugin provide a pattern and we construct a function out of it */
export declare function patternPluginFanctory(pattern: string): (value: string) => Promise<boolean>;
