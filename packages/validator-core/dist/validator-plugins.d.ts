/**
  instead of loading pluign in each ValidatorFactory
  we should create a base class that load all internal plugins
  and each ValidatorFactory add their extra plugin into this to share
*/
import type { JsonqlValidationPlugin, JsonqlValidationRule } from './types';
export declare class ValidatorPlugins {
    idx?: number | undefined;
    private _plugins;
    private _internalPluginNames;
    private _externalPluginNames;
    /** with a idx to id this instance */
    constructor(idx?: number | undefined);
    /**
    find the plugin internal or external
    propName is the argument name
    */
    lookupPlugin(input: JsonqlValidationRule, propName: string): (value: unknown, lastResult: import("./types").JsonqlGenericObject, pos: number[]) => Promise<any>;
    /** The public api to register a plugin */
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** basically overload the _registerPlugin with adding name to ext list */
    loadExtPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** get a list of the plugin names */
    getPluginNames(ext?: boolean): string[];
    /** register plugins */
    protected _registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin, skipCheck?: boolean): void;
}
