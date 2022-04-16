const server = require('./server-throw');
const http = require('http');

const app = server(true);

app.listen(8899);

setTimeout(() => {

  http.get('http://localhost:8899');

}, 3000);
