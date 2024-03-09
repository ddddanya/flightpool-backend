const mysql2 = require('mysql2/promise');
const dotenv = require("dotenv")
dotenv.config()

if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_DATABASE) {
    throw new Error("Please, configure database in .env file")

}

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    connectionLimit: 1000
});

async function execute(sql, params) {
    const connection = await pool.getConnection()

    const [rows, fields] = await connection.query(sql, params);
    return rows;
}

module.exports = execute
