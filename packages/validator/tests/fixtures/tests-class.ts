// use this to run the decorator
import {
  InitValidator,
  Validate,
} from '../../src/decorator'

@InitValidator
export default class TestsClass {

  @Validate<TestsClass>({
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
