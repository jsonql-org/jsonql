import { ValidatorPlugins } from './validator-plugins';
import { JsonqlValidationPlugin } from './types';
export declare class ExternalPluginLoader extends ValidatorPlugins {
    constructor();
    /** main method */
    registerExternalPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
}
