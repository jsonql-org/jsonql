/**
  instead of loading pluign in each ValidatorFactory
  we should create a base class that load all internal plugins
  and each ValidatorFactory add their extra plugin into this to share
*/
import type { JsonqlPluginConfig, JsonqlValidationPlugin, JsonqlValidationRule } from './types';
export declare class ValidatorPlugins {
    $version?: number | undefined;
    private _plugins;
    private _internalPluginNames;
    /** with a idx to id this instance */
    constructor($version?: number | undefined);
    /**
    find the plugin internal or external
    argName is the argument name
    */
    lookupPlugin(input: JsonqlValidationRule, argName: string): (value: unknown, lastResult: import("./types").JsonqlGenericObject, pos: number[]) => Promise<any>;
    /** The public api to register a plugin */
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** call this when loading external plugin, not allow to use directly */
    protected _registerExternalPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** this is no longer in use and we change the usage to export list of names that can be add to contract */
    export(external?: boolean): JsonqlValidationPlugin[];
    /** just check if this plugin is built-in */
    isBuiltIn(pluginName: string): boolean;
    /** register plugins */
    protected _registerPlugin(name: string, pluginConfig: Partial<JsonqlPluginConfig>, skipCheck?: boolean, // when register internal plugin then skip it
    external?: boolean): void;
}
