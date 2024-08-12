// Importing module
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.HOST,        // Host Name
    user: process.env.USER,            // Database Username
    password: process.env.PASSWORD,        // Database Password
    database: process.env.DATABASE       // Database Name
});

module.exports = connection