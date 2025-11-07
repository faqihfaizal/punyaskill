const mysql= require('mysql2/promise');
const JWT_SECRET = "supersecret123";

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Bandung_123',
    database: process.env.DB_NAME || 'siswa_smk',
    waitForConnections: true,
    connectionLimit: 10,
    multipleStatements: true
});



module.exports = pool;