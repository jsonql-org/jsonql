const { join } = require('path');
const server = require('server-io-core');
const webroot = [
  join(__dirname, '..', '..', 'dist'),
  join(__dirname, 'html')
];

server({
  webroot
});
