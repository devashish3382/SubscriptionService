const express = require('express');
const message = require('./../ErrorMessage.json');
const router = express.Router();
const { createUserData } = require('../Actions/UserAction');
const { AddUser, GetUserByName } = require('../DB/Queries');

router.get('/user/:name', async (req, res) => {
  let name = req.params.name;
  try {
    let response = await GetUserByName(name);
    res.status(200).send(response);
  }
  catch (err) {
    res.status(404).send(`${name} is not registerd`);
  }
})

router.put('/user/:name', async (req, res) => {
  try {
    let name = req.params.name;
    let response = createUserData(name);
    await AddUser(response);
    res.status(200).send("Success");
  } catch (e) {
    msg = message[e.code] || 'Unable to register';
    res.status(400).send(msg);
  }
})

module.exports = router;