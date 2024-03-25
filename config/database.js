const path = require('path');
const storage_path = path.join(__dirname, '../storage');

// Configuração do banco de dados
module.exports = {
  default: 'sqlite',

  sqlite: {
    dialect: 'sqlite',
    storage: path.join(storage_path, "database.sqlite")
  }, 

  mysql: {
    database: 'projetoweb',
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
  }, 

  pgsql: {
    database: 'projetoweb',
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: '5432',
    dialect: 'pgsql'
  }
}
