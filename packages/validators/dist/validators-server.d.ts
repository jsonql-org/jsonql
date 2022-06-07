import type { JsonqlAstFullMap } from './types';
import type { Validator } from '@jsonql/validator';
import type { MixedValidationInput, JsonqlValidationPlugin } from '@jsonql/validator/index';
import { Validators } from './validators';
export declare class ValidatorsServer extends Validators {
    constructor(astMap: JsonqlAstFullMap);
    /** loading and register external plugins */
    loadExternalPlugins(path: string): Promise<any[]>;
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** This is created for FastApi to dump a whole set of plugins registration from a Map */
    registerPlugins(pluginConfigs: Map<string, JsonqlValidationPlugin>): void;
    /** esbuild some shit code */
    private _getPluginValue;
    /**
      pass a path and we search for plugins and load it
      we only support js files at the moment
    */
    private _importExternalPlugins;
}
