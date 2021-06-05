require('./DB/ConnectDB')
const express = require("express");
const User = require('./Routers/UserRouter');
const Subscribe = require('./Routers/Subscription');
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(User);
app.use(Subscribe);
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
})