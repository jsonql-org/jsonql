import { CallbackFunction } from '../types';
/**
 * break out to make the code easier to read
 */
export declare function validateHandler(value: any, cb: CallbackFunction): any;
/**
 * Check against the enum value if it's provided
 */
export declare function enumHandler(value: any, enumv: any): boolean;
/**
 * Allow passing a function to check the value
 * There might be a problem here if the function is incorrect
 * and that will makes it hard to debug what is going on inside
 * @TODO there could be a few feature add to this one under different circumstance
 */
export declare function checkerHandler(value: any, checker: CallbackFunction): boolean;
/**
 * Taken out from the runValidaton this only validate the required values
 */
export declare function runValidationAction(cb: CallbackFunction): (value: any, key: string) => any;
/**
 * finally run the options validation
 */
export declare function runValidation(args: any, cb: CallbackFunction): any;
