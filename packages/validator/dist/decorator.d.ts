import 'reflect-metadata';
import { JsonqlArrayValidateInput, JsonqlObjectValidateInput, DescriptorMeta } from './types';
export declare const jsonqlAstKey: unique symbol;
export declare const jsonqlValidationKey: unique symbol;
/**
 * We need this class decorator to collect all the necessary info for this class
 */
export declare function InitValidator<T extends {
    new (...args: any[]): {};
}>(constructor: T): {
    new (...args: any[]): {};
} & T;
/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
export declare function Validate<T>(rules?: JsonqlArrayValidateInput | JsonqlObjectValidateInput): (target: T, propertyName: string, descriptor: DescriptorMeta) => void;
