const { GetPlanById, GetUserByName } = require('./../DB/Queries');

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
const getExpiry = (currentDate, days) => {
  let tmpDate = new Date(currentDate);
  let expiry_date = new Date(currentDate);
  expiry_date.setDate(tmpDate.getDate() + days);
  expiry_date = expiry_date.getFullYear() + "-" + (expiry_date.getMonth()+1) + "-" + expiry_date.getDate();
  return expiry_date;
}
module.exports = { isValidPlan, isValidUser, getExpiry };