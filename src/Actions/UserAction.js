const moment = require('moment');

const createUserData = (user_name) => {
  let finalDateAndTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  let data = {
    user_name,
    created_at: finalDateAndTime
  }
  return data;
}
module.exports = { createUserData };