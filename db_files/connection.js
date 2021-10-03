const mysql=require('mysql');
const {db_host,db_user,db_pass, db_name}=require('../config');

const pool = mysql.createPool({
    connectionLimit: 10,    
    password: db_pass,
    user: db_user,
    database: db_name,
    host: db_host
  
}); 

const con=pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query('SELECT * FROM users', function (error, results, fields) {
        console.log('database connected')
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });
module.exports={con,pool};