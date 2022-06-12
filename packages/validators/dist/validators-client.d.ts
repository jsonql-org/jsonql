import type { JsonqlAstFullMap, ClientPluginConfigs } from './types';
import { Validators } from './validators';
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export declare class ValidatorsClient extends Validators {
    /** main */
    constructor(astMap: JsonqlAstFullMap);
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs: ClientPluginConfigs): void;
}
