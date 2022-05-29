import test from 'ava'


test(`Should able to understand different style or rules input`, t => {

  const obj = {
    main(i: number) {
      return ++i
    }
  }

  t.is(2, obj.main(1))

})
