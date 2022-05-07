// Contract related methods
// create a sync version for JsonqlContract
import {
  processClassModuleBody,
  normalize,
  processArgs,
  processFunctionModuleBody,
  processArgParams,
} from './lib/processors'

import { tsFileParserSync } from './main'
