export declare const plugins: ({
    main: (max: number, min: number, value: string | number) => boolean;
    name: string;
    params: string[];
} | {
    main: (value: string) => boolean;
    name: string;
} | {
    name: string;
    main: (value: number) => boolean;
})[];
