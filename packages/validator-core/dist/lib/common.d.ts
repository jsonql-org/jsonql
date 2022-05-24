import type { JsonqlValidateFn, JsonqlGenericObject } from '../types';
/** check plugin argument against keywords list */
export declare function checkPluginArg(params: Array<string>): boolean;
/** check if the actually provide a func or pattern to construct function */
export declare function pluginHasFunc(rule: JsonqlGenericObject): boolean;
/**
this will get re-use in the class to create method for the queue execution
 */
export declare function constructRuleCb(argName: string, ruleFn: JsonqlValidateFn, ruleName?: string | unknown): (value: unknown, lastResult: JsonqlGenericObject, pos: number[]) => Promise<any>;
/** This is taken out from the above then call for re-use when we want to fall through a rule */
export declare function successThen(argName: string, value: unknown, lastResult: JsonqlGenericObject, pos: number[]): (result: unknown) => any;
/** check to see if the lastResult contain our lastResult package format or just their value */
export declare function isResultPackage(lastResult: unknown, key?: string): boolean;
/** If the plugin provide a pattern and we construct a function out of it */
export declare function patternPluginFanctory(pattern: string): (value: string) => Promise<boolean>;
