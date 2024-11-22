const mysql = require('mysql2');
const AWS = require('aws-sdk');
const config = require('../config/config.json');


function generateAuthToken() {
  return new Promise((resolve, reject) => {
    const signer = new AWS.RDS.Signer({
      region: config.region, 
      hostname: config.host,  
      port: 3306,  
      username: config.user,  
    });


    const token = signer.getAuthToken();
    resolve(token);
  });
}

async function createPool() {
  try {
    const password = await generateAuthToken(); 

    const pool = mysql.createPool({
      host: config.host,
      user: config.user,
      database: config.database,
      password: password,
      
    });

    return pool.promise();
  } catch (error) {
    console.error('Error generating DB auth token or creating pool:', error);
    throw error;
  }
}

// Export the connection pool
module.exports = createPool;
