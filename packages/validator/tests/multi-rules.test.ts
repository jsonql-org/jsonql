import test from 'ava'
import { Validator } from '../src'

const ast = [
  {
    "name": "arg1",
    "required": true,
    "type": "string"
  },
  {
    "name": "arg2",
    "required": true,
    "type": "number"
  }
];
let val1: Validator

test.before(() => {
  val1 = new Validator(ast)
})

test(`Should able to understand different style or rules input`, t => {

  val1.addValidationRules({
    arg1: {
      validate(value: string) {
        return value.indexOf('Hola') > -1
      }
    },
    arg2: [
      function inlineFunction(value: number) {
        return value > 50
      }
    ]
  })

  val1.validate(['Hola', 51])
      .then(() => {
        t.pass()
      })



})
