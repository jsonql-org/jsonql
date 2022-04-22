
/** mimic the functionality of the Rest decorator */
export function TestDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {

  const stacks = new Error().stack?.split('\n')


  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)

      console.log('stacks', stacks)

    }
  }

}
