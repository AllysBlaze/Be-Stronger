const mysql = require('mysql2');
const {
  db_host,
  db_user,
  db_pass,
  db_name
} = require('../config');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: db_pass,
  user: db_user,
  database: db_name,
  host: db_host

});
pool.getConnection(function (err, connection) {
  if (err) throw err;
  connection.query('SELECT 1', function (error, results, fields) {
    console.log('database connected')
    connection.release();
    if (error) throw error;
  });
});

module.exports = pool;