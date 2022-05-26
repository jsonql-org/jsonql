/**
  instead of loading pluign in each ValidatorFactory
  we should create a base class that load all internal plugins
  and each ValidatorFactory add their extra plugin into this to share
*/
import type { JsonqlValidationPlugin, JsonqlValidationRule } from './types';
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
    /** export all plugins for generate js file */
    export(): void;
    /** register plugins */
    protected _registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin, skipCheck?: boolean): void;
}
