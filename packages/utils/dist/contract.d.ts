import { JsonqlContract } from './types';
/**
 * Check if the json is a contract file or not
 */
export declare function checkIsContract(contract: JsonqlContract): boolean;
/**
 * Wrapper method that check if it's contract then return the contract or false
 */
export declare function isContract(contract: JsonqlContract): JsonqlContract | boolean;
/**
 * Ported from jsonql-params-validator but different
 * if we don't find the socket part then return false
 */
export declare function extractSocketPart(contract: JsonqlContract): any;
/**
 * Extract the args from the payload
 */
export declare function extractArgsFromPayload(payload: any, type: string): Array<any>;
/**
 * extract the param from a contracct
 */
export declare function extractParamsFromContract(contract: JsonqlContract, type: string, name: string): any;
