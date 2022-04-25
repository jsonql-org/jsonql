// just test the construct config method
const test = require('ava')
const {
  checkConfig,
  constructConfig,
  createConfig,
  JSONQL_PARAMS_VALIDATOR_INFO
} = require('../dist/jsonql-params-validator.umd' /*'../main'*/)
const {
  ARGS_KEY,
  TYPE_KEY,
  CHECKER_KEY,
  ENUM_KEY,
  OPTIONAL_KEY,
  ALIAS_KEY,
  NUMBER_TYPE,
  STRING_TYPE
} = require('jsonql-constants')
const {
  appProps,
  constProps
} = require('./fixtures/export-options')
const debug = require('debug')('jsonql-params-validator:test:contruct-config')




test('It should have a JSONQL_PARAMS_VALIDATOR_INFO', t => {
  // debug(JSONQL_PARAMS_VALIDATOR_INFO);
  // cjsVersion.JSONQL_PARAMS_VALIDATOR_INFO, umdVersion.JSONQL_PARAMS_VALIDATOR_INFO
  t.truthy(JSONQL_PARAMS_VALIDATOR_INFO)
})

test('It should return the right key in the object', t => {

  let line = constructConfig(123, NUMBER_TYPE)

  t.true( line[TYPE_KEY] ===  NUMBER_TYPE , 'Should pass the correct type value as is')
  t.falsy( line[OPTIONAL_KEY] , 'Should not have an optional prop')

})

test('It should not contain the property if they are in the wrong type', t => {
  let alias = 'someOtherKey';
  let line = createConfig('keyToUse', STRING_TYPE, {
    [ALIAS_KEY]: alias,
    [CHECKER_KEY]: value => !!value
  });

  t.true(line[ALIAS_KEY] === alias)

  t.true( line[OPTIONAL_KEY] === undefined ,'keyToUse should have no optional prop')
  t.falsy( line[ENUM_KEY] , 'keyToUse should have no enum prop')
  t.true( typeof line[CHECKER_KEY] === 'function', 'keyToUse should have a checker function')

})

test('It should able to get the alias and turn into the right prop', t => {
  let target = 'aliasProp';
  let value = 'some-key-to-pass';
  let alias = 'otherName';

  let opts = checkConfig({[alias]: value}, appProps)
  // debug(opts[target]);
  t.true( opts[target] === value )
  t.falsy( opts[alias] )
})
