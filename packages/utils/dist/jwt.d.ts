/// <reference types="node" />
/**
 * create a buffer from string
 */
export declare function buff(str: string, format?: "base64"): Buffer;
/**
 * encode in base64 string
 */
export declare const base64Encode: (str: any) => string;
/**
 * decode from base64 string
 */
export declare const base64Decode: (json: string) => string;
