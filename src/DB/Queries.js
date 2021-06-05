const connection = require('./ConnectDB');
const AddUser = ({ user_name, created_at }) => {
  return new Promise((resolve, reject) => {
    let query = `insert into users(user,created_at) value ("${user_name}","${created_at}")`;
    connection.query(query, (err) => {
      if (err)
        return reject(err);
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
      let response = { "user_name": result[0].user, "created_at": result[0].created_at };
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
      return resolve(result);
    })
  })
}

const getPlansByNameAndDate = (name, date) => {
  return new Promise((resolve, reject) => {
    let query = `select plan_id,start_date,expiry_date from userplans where user_name="${name}"`;
    connection.query(query, (err, result) => {
      if (err || result.length <= 0)
        return reject(err);
      response = result.reduce((active_plan) => {
        let days_left = new Date(active_plan.expiry_date).getDate() - new Date(date).getDate();
        let plan_id = active_plan.plan_id;
        return { plan_id, days_left }
      })
      return resolve(response);
    })
  })
}

module.exports = { AddUser, GetUserByName, GetPlanById, AddPlan, getPlansByNameAndDate, getPlansByName };