const { GetPlanById, GetUserByName } = require('./../DB/Queries');
const moment = require('moment');

const isValidPlan = async (req, res, next) => {
  let plan_id = req.body.plan_id;
  try {
    req.requestedPlan = await GetPlanById(plan_id);
    next();
  }
  catch (err) {
    return res.status(404).send("Plan ID is Invalid")
  }
}
const isValidUser = async (req, res, next) => {
  let user_name = req.body.user_name || req.params.name;
  try {
    await GetUserByName(user_name)
    next();
  } catch (error) {
    res.status(404).send("User not found");
  }
}
const isValidDate = (req, res, next) => {
  let date = req.params.date;
  if (!moment(date).isValid())
    res.status(400).send("Invalid Date");
  next();
}
const getExpiry = (currentDate, days) => {
  expiry_date = moment(currentDate).add(24*days*60*60*1000).format('YYYY-MM-DD');
  return expiry_date;
}
module.exports = { isValidPlan, isValidUser, getExpiry, isValidDate };