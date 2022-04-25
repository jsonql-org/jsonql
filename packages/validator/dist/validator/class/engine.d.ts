import { JsonqlPropertyParamnMap } from '../../types';
/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
all of these has moved to the ValidatorFactoryBase
because the plugins are apply there
*/
/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
export declare function createAutomaticRules(astMap: Array<JsonqlPropertyParamnMap>): Array<JsonqlPropertyParamnMap>;
