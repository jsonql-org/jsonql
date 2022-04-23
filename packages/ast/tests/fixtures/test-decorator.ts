
import { pickInputFile } from '../../src/processors'
import { tsClassParser } from '../../src'

/** mimic the functionality of the Rest decorator */
export function TestDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {

  const me = pickInputFile(new Error(), '__decorateClass')
  
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      tsClassParser(me)
        .then(ast => {
          console.dir(ast, { depth: null })
        })
    }
  }

}
