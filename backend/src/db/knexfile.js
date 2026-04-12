require('dotenv').config({path: '../../.env'})
const path = require('path')

module.exports = {
  development : {
    client : 'pg',
    connection : process.env.DATABASE_URL,
    migrations : {
      directory : path.join(__dirname, 'migrations'),
    },
  },
}