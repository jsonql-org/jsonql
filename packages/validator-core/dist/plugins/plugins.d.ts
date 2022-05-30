/** just make this clear where the plugins coming from */
import type { JsonqlPluginConfig, JsonqlValidateFn, JsonqlPluginInput } from '../types';
/**
  construct the curry plugin method
  @0.5.0 we make this generic
*/
export declare function curryPlugin(input: JsonqlPluginInput, pluginConfig: JsonqlPluginConfig): JsonqlValidateFn;
/** @TODO it needs to be a js file then it must be after compile */
export declare function getPlugin(pluginName: string): Promise<any>;
