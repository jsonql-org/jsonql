// use this to run the decorator
import {
  InitValidator,
  Validate,
} from '../../src'

@InitValidator
export default class TestsClass {

  @Validate<TestClass>({
    username: {
      plugin: 'moreThan', arg: 8
    },
    password: {
      plugin: 'between', max: 20, min: 5
    }
  })
  login(username: string, password: string) {

    return { username, password }
  }


}
