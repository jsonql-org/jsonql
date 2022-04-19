// import trim from 'lodash-es/trim'
/**
 * From underscore.string library
 * turn a string into a-string
 */
export const dasherize = (str: string): string => {

  return clearOutput(
        str
          .trim()
          .replace(/([A-Z])/g, '-$1')
          .replace(/[-_\s]+/g, '-')
          .toLowerCase()
        )
}

const clearOutput = (str: string) => {
  const fc = str.substring(0,1)

  return (fc !== '_' && fc !== '-') ? str : str.substring(1)
}
