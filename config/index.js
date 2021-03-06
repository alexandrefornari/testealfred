const dotenv = require('dotenv');

const result = dotenv.config()

if (result.error) {
  throw result.error
}

//console.log(result.parsed)

const database = require('./database')
const server = require('./server')
const crypto = require('./crypto')

module.exports = {
  database,
  server,
  crypto,
}