import 'reflect-metadata';
/**
When using TS to develop resolver with jsonql
dev can use the combo of class and decorator
*/
export declare function Validate<T>(rules?: any): (target: T, propertyName: string) => void;
