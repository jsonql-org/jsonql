// class method with Decorator
import { TestDecorator } from './test-decorator'


@TestDecorator
export default class MyApiExample3 {

  /** spread of the same type */
  method1(...argA: any[]): void {
    console.log(argA)
  }

  /** spread of union type */
  method2(...argB: Array<number | string>): void {
    console.log(argB)
  }

}
