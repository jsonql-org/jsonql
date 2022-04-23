import { checkNumber } from './number';
import { checkAny } from './any';
/**
 * this is a wrapper method to call different one based on their type
 */
export declare function combineCheck(type: string): typeof checkNumber | typeof checkAny;
