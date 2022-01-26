const mysql = require('mysql');

const config = {
    connectionLimit : 10,
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = connection;
