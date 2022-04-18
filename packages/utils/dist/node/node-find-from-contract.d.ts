import { JsonqlContract } from '../types';
/**
 * ported from jsonql-resolver
 * Using the contract to find the function to call
 */
export declare function findFromContract(type: string, name: string, contract: JsonqlContract): string | boolean;
