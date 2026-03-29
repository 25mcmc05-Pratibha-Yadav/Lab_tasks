const mysql = require('mysql2/promise');

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Ravi#890',
            database: 'crud_app'
        });

        console.log('Connected to MySQL database');
        return connection;

    } catch (err) {
        console.error('Error connecting to MySQL:', err.message);
        throw err;
    }
}

connectDB() ; 

module.exports = connectDB;