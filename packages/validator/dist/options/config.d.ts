import { JsonqlConfigParams, AsyncCallbackFunction, CallbackFunction } from '../types';
/**
 * This has a different interface
 */
export declare function createConfig(value: any, type: string | string[], params: JsonqlConfigParams): {
    args: any;
    type: string | string[];
};
/**
 * construct the actual end user method, rename with prefix get since 1.5.2
 */
export declare function getCheckConfigAsync(validateSync: AsyncCallbackFunction): AsyncCallbackFunction;
/**
 * copy of above but it's sync, rename with prefix get since 1.5.2
 */
export declare function getCheckConfig(validateSync: CallbackFunction): CallbackFunction;
