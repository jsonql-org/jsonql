import { CallbackFunction } from '../types';
/**
 * create function to construct the config entry so we don't need to keep building object
 */
export declare function constructConfig(args: any, // should this be string?
type: string | string[], optional?: boolean, enumv?: boolean | any[], checker?: boolean | CallbackFunction, alias?: boolean | string): {
    args: any;
    type: string | string[];
};
