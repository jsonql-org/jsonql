import { JsonqlPluginConfig, JsonqlValidateFn, JsonqlPluginInput } from '../types';
/** This will lookup our internal plugins list */
export declare function createCoreCurryPlugin(input: JsonqlPluginInput): JsonqlValidateFn;
/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
export declare function curryPlugin(config: JsonqlPluginInput, pluginExport: JsonqlPluginConfig): JsonqlValidateFn;
/** check if the expected key presented in the config */
export declare function checkArgKeys(config: JsonqlPluginInput, params: Array<string>): boolean;
/** @TODO it needs to be a js file then it must be after compile */
export declare function getPlugin(pluginName: string): Promise<any>;
