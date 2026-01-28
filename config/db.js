require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("DB failed ❌", err);
  } else {
    console.log("DB connected ✅");
  }
});

module.exports = pool;
