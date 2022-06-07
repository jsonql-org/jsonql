import type { JsonqlAstFullMap } from './types';
import { Validators } from './validators';
export declare class ValidatorsServer extends Validators {
    constructor(astMap: JsonqlAstFullMap);
    /** loading and register external plugins */
    loadExternalPlugins(path: string): Promise<any[]>;
    /** esbuild some shit code */
    private _getPluginValue;
    /**
      pass a path and we search for plugins and load it
      we only support js files at the moment
    */
    private _importExternalPlugins;
}
