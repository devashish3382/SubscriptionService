const connection = require('./ConnectDB');
const moment = require('moment');
const AddUser = ({ user_name, created_at }) => {
  return new Promise((resolve, reject) => {
    let query = `insert into users(user,created_at) value ("${user_name}","${created_at}")`;
    connection.query(query, (err) => {
      if (err) {
        return reject({ "code": err.errno });
      }
      return resolve();
    })
  })
}
const GetUserByName = (user_name) => {
  return new Promise((resolve, reject) => {
    let query = `select * from users where user="${user_name}"`;
    connection.query(query, (err, result, field) => {
      if (err || result.length <= 0) {
        return reject(err);
      }
      let user_name = result[0].user;
      let created_at = moment(result[0].created_at).format('YYYY-MM-DD HH:mm:ss')
      let response = { user_name, created_at };
      return resolve(response);
    })
  })
}
const GetPlanById = (plan_id) => {
  return new Promise((resolve, reject) => {
    let query = `select * from plans where plan_id="${plan_id}"`;
    connection.query(query, (err, result) => {
      if (err || result.length <= 0) {
        return reject(err);
      }
      return resolve(result[0]);
    })
  })
}

const AddPlan = ({ user_name, plan_id, start_date, expiry_date }) => {
  return new Promise((resolve, reject) => {
    let query = `insert into userplans(user_name,plan_id,start_date,expiry_date) value ("${user_name}","${plan_id}","${start_date}","${expiry_date}")`;
    connection.query(query, (err, result) => {
      if (err || result.length <= 0)
        return reject(err);
      return resolve("Success");
    })
  })
}

const getPlansByName = (name) => {
  return new Promise((resolve, reject) => {
    let query = `select plan_id,start_date,expiry_date from userplans where user_name="${name}"`;
    connection.query(query, (err, result) => {
      if (err || result.length <= 0)
        return reject(err);
      let response = result.map((active_plan) => {
        return { "plan_id": active_plan.plan_id, "start_date": moment(active_plan.start_date).format('YYYY-MM-DD'), "valid_till": moment(active_plan.expiry_date).year()>4500?'infinite':moment(active_plan.expiry_date).format('YYYY-MM-DD') };
      })
      return resolve(response);
    })
  })
}

const getPlansByNameAndDate = (name, date) => {
  return new Promise((resolve, reject) => {
    let query = `select plan_id,start_date,expiry_date from userplans where user_name="${name}" and expiry_date>"${date}"`;
    connection.query(query, (err, result) => {
      if (err || result.length <= 0)
        return reject(err);
      response = result.map((active_plan) => {
        let days_left = moment(active_plan.expiry_date).year()>4500?'infinite':moment(active_plan.expiry_date).diff(date, 'days');
        let plan_id = active_plan.plan_id;
        return { plan_id, days_left }
      })
      return resolve(response);
    })
  })
}

module.exports = { AddUser, GetUserByName, GetPlanById, AddPlan, getPlansByNameAndDate, getPlansByName };