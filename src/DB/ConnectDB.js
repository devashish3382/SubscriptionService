const mysql = require('mysql');
const connection = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT,
    database: "subscriptionservice"
  }
)
connection.connect((err) => {
  if (err)
    throw new Error("Could not connect to DB");
})
module.exports = connection;