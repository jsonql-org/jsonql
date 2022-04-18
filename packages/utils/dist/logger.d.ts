declare global {
    interface Window {
        DEBUG?: any;
        JSONQL_DEBUG?: any;
    }
}
/**
 * simple for browser console.info wrapper
 */
export declare function logger(...args: any[]): void;
/**
 * generic logger method can control via global property
 */
export declare const getLogger: (name: string) => (...args: any[]) => void;
