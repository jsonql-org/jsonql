/**
  instead of loading pluign in each ValidatorFactory
  we should create a base class that load all internal plugins
  and each ValidatorFactory add their extra plugin into this to share
*/
import type { JsonqlValidationPlugin, JsonqlValidationRule, JsonqlValidateFn } from './types';
export declare class ValidatorPlugins {
    private _plugins;
    private _internalPluginNames;
    constructor();
    /**
    find the plugin internal or external
    propName is the argument name
    */
    lookupPlugin(input: JsonqlValidationRule, propName: string): JsonqlValidateFn;
    /** The public api to register a plugin */
    regigsterPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** register plugins */
    protected _registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin, skipCheck?: boolean): void;
}
