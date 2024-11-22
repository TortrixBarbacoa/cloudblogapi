const mysql = require('mysql2');
const AWS = require('aws-sdk');
const config = require('../config/config.json');

// Initialize AWS RDS client
const rds = new AWS.RDS();

// Function to generate the IAM authentication token
function generateAuthToken() {
  return new Promise((resolve, reject) => {
    const token = rds.generateDbAuthToken({
      DBHostname: config.host,
      Port: 3306,
      DBUsername: config.user
    });
    resolve(token); // Return the generated token
  });
}

// Create a MySQL connection pool
async function createPool() {
  try {
    const password = await generateAuthToken(); // Generate IAM token for password

    const pool = mysql.createPool({
      host: config.host,
      user: config.user,
      database: config.database,
      password: password,
      ssl: {
        ca: '/path/to/your/rds-ca-cert.pem'
      }
    });

    return pool.promise(); // Return pool with promise API
  } catch (error) {
    console.error('Error generating DB auth token or creating pool:', error);
    throw error;
  }
}

// Export the connection pool
module.exports = createPool;
