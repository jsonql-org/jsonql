import server from './server-throw'
import http from 'http'

const app = server(true)

app.listen(8899)

setTimeout(() => {

  http.get('http://localhost:8899')

}, 3000)
