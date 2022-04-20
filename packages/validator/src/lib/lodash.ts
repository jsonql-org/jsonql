// group all the lodash code in one place
// these really should be in the @jsonql/utils
import isNaN from 'lodash-es/isNaN'
import isString from 'lodash-es/isString'
import isPlainObject from 'lodash-es/isPlainObject'
import isFunction from 'lodash-es/isFunction'
import merge from 'lodash-es/merge'
import mapValues from 'lodash-es/mapValues'

import mapKeys from 'lodash-es/mapKeys'
import omitBy from 'lodash-es/omitBy'
// import isEqual from 'lodash-es/isEqual'
import findKey from 'lodash-es/findKey'

// export
export {
  isNaN,
  isString,
  isPlainObject,
  isFunction,
  merge,
  mapValues,
  mapKeys,
  omitBy,
  // isEqual,
  findKey,
}
