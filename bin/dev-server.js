const config = require('../server/server.config.js')
const server = require('../server')
const debug = require('debug')('app:bin:dev-server')

server.listen(config.port, config.port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
debug(`Server is now running at http://${config.host}:${config.port}.`)
