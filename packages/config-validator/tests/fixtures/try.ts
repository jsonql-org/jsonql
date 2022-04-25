const {
  validateSync,
  validateAsync,
  normalizeArgs
} = require('../../main.js');
// const { join } = require('path');
// const fsx = require('fs-extra');
// const contractJson = fsx.readJsonSync(join(__dirname, 'contract.json'));
// const { inspect } = require('util');

const debug = require('debug')('jsonql-params-validator:try');

// Testing the complex Type array<string|number>
let args = [
  [1, 2, 3] // {msg: 'I should not be here'},
];
let params = [
  {
    type: ['array.<number>'], // |string
    name: 'dummy',
    description: 'Array of number or string'
  }
];

// const result = validateSync(args, params);

validateAsync([], [])
  .then(result => {
    debug('test result', result);
  });
