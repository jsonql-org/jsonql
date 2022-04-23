import { JsonqlConfig, JsonqlAppProps } from '../types';
/**
 * Map the alias to their key then grab their value over
 */
export declare function mapAliasConfigKeys(config: JsonqlConfig, appProps: JsonqlAppProps): JsonqlConfig;
/**
 * We only want to run the valdiation against the config (user supplied) value
 * but keep the defaultOptions untouch
 */
export declare function preservePristineValues(config: JsonqlConfig, appProps: JsonqlAppProps): JsonqlConfig;
/**
 * This will take the value that is ONLY need to check
 */
export declare function processConfigAction(config: JsonqlConfig, props: JsonqlAppProps): JsonqlConfig;
/**
 * Quick transform
 * @TODO we should only validate those that is pass from the config
 * and pass through those values that is from the defaultOptions
 */
export declare function prepareArgsForValidation(opts: JsonqlConfig, appProps: JsonqlAppProps): JsonqlConfig;
