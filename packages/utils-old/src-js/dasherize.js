
import trim from 'lodash-es/trim'
/**
 * From underscore.string library
 * @BUG there is a bug here with the non-standard name start with _
 * @param {string} str string
 * @return {string} dasherize string
 */
export const dasherize = str => (
  trim(str)
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase()
)
