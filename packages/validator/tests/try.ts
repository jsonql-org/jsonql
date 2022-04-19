import { Validate } from '../src/decorator'


class MyApi {

  @Validate<MyApi>()
  myMethod(name: string, age: number) {
    console.log(name, age)
  }

}


const api = new MyApi()

api.myMethod('Joe', 100)
