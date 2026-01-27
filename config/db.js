const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Harika_1407",
  database: "todo_app"
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed ❌");
    console.log(err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

module.exports = db;
