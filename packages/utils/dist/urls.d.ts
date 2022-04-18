/**
 * construct a url with query parameters
 */
export declare const urlParams: (url: string, params: any) => string;
/**
 * construct a url with cache burster
 */
export declare const cacheBurstUrl: (url: string) => string;
/**
 * return _cb as key with timestamp
 */
export declare const cacheBurst: () => {
    _cb: number;
};
