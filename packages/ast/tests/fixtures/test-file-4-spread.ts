// class method with Decorator
import { TestDecorator } from './test-decorator'


@TestDecorator
export default class MyApiExample3 {

  /** spread of the same type */
  method1(...args: any[]): void {
    console.log(args)
  }

  /** spread of union type */
  method2(...args: Array<number | string>): void {
    console.log(args)
  }

}
