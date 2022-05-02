// testing the curry theory for the validator plugin system
import test from 'ava'
import { curry } from '../src/lodash'


test(`Testing the lodash curry method for our validator plugin system`, t => {
  const moreThan = (arg: number, value: number): boolean => value > arg
  const between = (max: number, min: number, value: number): boolean => value < max && value > min

  const curryFn = curry(moreThan)(10)
  const curryFn1 = curry(between)(100, 10)

  t.true(curryFn(100))
  t.false(curryFn(1))

  t.true(curryFn1(80))
  t.false(curryFn1(101))

})
