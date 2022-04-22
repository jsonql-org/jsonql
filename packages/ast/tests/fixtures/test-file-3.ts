// class method with Decorator
import { TestDecorator } from './test-decorator'

@TestDecorator
export default class MyApiExample3 {


  method1(arg1: string, arg2: number) {

    return `${arg1} is not ${arg2}`
  }



}
