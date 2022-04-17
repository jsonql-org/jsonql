// import trim from 'lodash-es/trim'
/**
 * From underscore.string library
 * turn a string into a-string
 */
export const dasherize = (str: string): string => {
  let _str = str.trim()
  let fc = _str.substring(0,1)

  return (fc === '_' || fc === '-' ? _str.substring(1) : _str)
          .replace(/([A-Z])/g, '-$1')
          .replace(/[-_\s]+/g, '-')
          .toLowerCase()
}
