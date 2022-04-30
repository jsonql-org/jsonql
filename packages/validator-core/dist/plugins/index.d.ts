export declare const plugins: ({
    main: (max: number, min: number, value: number) => boolean;
    name: string;
    params: string[];
} | {
    main: (value: string) => boolean;
    name: string;
} | {
    name: string;
    main: (value: number) => boolean;
})[];
/** @TODO it needs to be a js file then it must be after compile */
export declare function getPlugin(pluginName: string): Promise<any>;
