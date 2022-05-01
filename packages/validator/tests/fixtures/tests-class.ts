// use this to run the decorator
import { Validate } from '../../src'


export default class TestClass {


  @Validate({
    username: {
      plugin: 'moreThan', arg: 8
    },
    password: {
      plugin: 'moreThan', arg: 8
    }
  })
  login(username: string, password: string) {

    return { username, password }
  }


}
