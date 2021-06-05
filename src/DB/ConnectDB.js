const mysql = require('mysql');
const connection = mysql.createConnection(
  {
    user:"root",
    password:'Deva947%',
    host:"localhost",
    port:3306,
    database:"subscriptionservice"
  }
)
connection.connect((err)=>{
  if(err)
  throw new Error("Could not connect to DB");
})
module.exports  = connection;