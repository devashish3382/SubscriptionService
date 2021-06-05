const createUserData = (user_name) => {
  let finalDateAndTime = customFormat(new Date());
  let data = {
    user_name,
    created_at: finalDateAndTime
  }
  return data;
}
const customFormat = (timeAndDate) => {
  return timeAndDate.getFullYear() + "-" + timeAndDate.getMonth() + "-" + timeAndDate.getDay() + " " + timeAndDate.getHours() + ":" + timeAndDate.getMinutes() + ":" + timeAndDate.getSeconds();
}
module.exports = { createUserData, customFormat };