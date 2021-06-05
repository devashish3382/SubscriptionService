const express = require('express');
const { isValidPlan, isValidUser, getExpiry } = require('./../Actions/SubscriptionAction')
const { AddPlan, getPlansByName, getPlansByNameAndDate } = require('../DB/Queries');
const router = express.Router();

router.post('/subscription', isValidPlan, isValidUser, async (req, res) => {
  let userData = req.body;
  let expiry_date = getExpiry(userData.start_date, req.requestedPlan.validity);
  userData.expiry_date = expiry_date;
  let amount = "+" + req.requestedPlan.cost;
  let response = { "status": "FAILURE", amount }
  try {
    await AddPlan(userData);
    amount = "-" + req.requestedPlan.cost;
    let response = { "status": "SUCCESS", amount }
    res.status(200).send(response);
  } catch (e) {
    res.status(400).send(response)
  }
})
router.get('/subscription/:name', isValidUser, async (req, res) => {
  try {
    let name = req.params.name;
    let response = await getPlansByName(name);
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(404).send("Plan not found")
  }
})
router.get('/subscription/:name/:date', isValidUser, async (req, res) => {
  try {
    let name = req.params.name;
    let date = req.params.date;
    let response = await getPlansByNameAndDate(name, date);
    res.status(200).send(response);
  } catch (e) {
    res.status(404).send("Plan not found")
  }
})
module.exports = router;