/**
 * @TODO if provide with the keys then we need to check if the key:value type as well
 */
export declare const checkObject: (value: any, keys?: any[] | undefined) => boolean;
/**
 * fold this into it's own function to handler different object type
 */
export declare const objectTypeHandler: (p: any) => any;
