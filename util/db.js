const mysql = require('mysql2');
const AWS = require('aws-sdk');
const config = require('../config/config.json');


async function createPool() {
  try { 

    const pool = mysql.createPool({
      host: config.host,
      port: 3306,
      user: config.user,
      database: config.database,
      password: config.password
      
    });

    return pool.promise();
  } catch (error) {
    console.error('Error generating DB auth token or creating pool:', error);
    throw error;
  }
}

// Export the connection pool
module.exports = createPool;
