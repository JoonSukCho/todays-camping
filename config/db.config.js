// .env 파일 사용
require('dotenv').config();

module.exports = {
  host: 'localhost',
  user: process.env.MY_SQL_ID,
  password: process.env.MY_SQL_PW,
  database: 'my_db',
};
