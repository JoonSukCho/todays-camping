import * as mysql from 'mysql2';

const dbConfig = require('../config/db.config');

module.exports = {
  connection: mysql.createConnection(dbConfig),
};
