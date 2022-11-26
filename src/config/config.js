const path = require('path')
require('dotenv').config({path:path.join(__dirname,'../../.env')})
console.log(process.env.PORT)

module.exports ={
  "development": {
    "username": "root",
    "password": null,
    "database": "typescritp",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
