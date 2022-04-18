/**
 * This will be a event emit from the client using the send method
 * But we have to change the server to understand it
 */
export declare const createSendPayload: (resolverName: string, args: any[], str?: boolean) => string | {
    [x: string]: any;
    TS: number[];
};
/**
 * The ws doesn't have a acknowledge callback like socket.io
 * so we have to DIY one for ws and other that doesn't have it
 */
export declare const createWsReply: (type: string, resolverName: string, data: any, ts?: any[]) => string;
export declare const createReplyMsg: (resolverName: string, data: any, ts?: never[]) => string;
export declare const createAcknowledgeMsg: (resolverName: string, data: any, ts?: never[]) => string;
/**
 * Check if this is a ws reply
 */
export declare const isWsReply: (payload: any) => any;
/**
 * Extract data from ws payload
 */
export declare const extractWsPayload: (payload: any, cb?: () => boolean) => any;
