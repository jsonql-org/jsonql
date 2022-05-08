// this is a class style

declare type DummyObj = {
  [key: string]: number
}

declare type StupidType = string

class MyOtherClass {

  say() {
    return "really???"
  }
}

export default class MyResolver extends MyOtherClass {

  // @TODO @Validate
  public main(
    arg1: number | boolean,
    arg2 = 'I am string',
    arg3?: any[],
    arg4 = false,
    arg5?: {[key: string]: string},
    arg6?: StupidType
  ) {
    return {
      arg1,
      arg2,
      arg3: arg3 ? arg3 : ['NOTHING'],
      arg4: arg4 ? arg4 : {},
      arg5: arg5 ? arg5 : {},
      arg6: arg6 ? arg6 : 'REALLY???'
    }
  }

  /** test a method without argument */
  public another() {
    return 'This has no params!'
  }

  protected iDontWantToBeSeen(here: string) {
    return here
  }

  /* @TODO test to reject the private and protected methods
  private aPrivateMethod() {

  }
  */
}
