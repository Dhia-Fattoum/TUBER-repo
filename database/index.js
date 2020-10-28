const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1995elyesferjani",
  database: "tuber",
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

const getAllDrivers = (callback) => {
  let syntax = `SELECT * FROM drivers`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getADriver = (email, callback) => {
  let syntax = `SELECT email FROM drivers WHERE email= '${email}' `;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const addNewDriver = (
  firstName,
  lastName,
  email,
  password,
  yearOfBirth,
  idCard,
  driveLicense,
  car,
  location,
  km,
  gender,
  rate,
  callback
) => {
  let syntax = `INSERT INTO drivers(firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES('${firstName}','${lastName}','${email}','${password}',${yearOfBirth},${idCard},${driveLicense},'${car}','${location}',${km},'${gender}',${rate})`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getEmailAndPassword = (email, password, callback) => {
  let syntax = `SELECT * FROM drivers WHERE email= '${email}' AND password = '${password}' `;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getHistory = (driver_id, callback) => {
  let syntax = `SELECT * FROM history WHERE driver_id="${driver_id}"`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
const createHistory = (longtitude, lattitude, idCard, callback) => {
  let syntax = `INSERT INTO history(longitude, lattitude,driver_id) VALUES ("${longtitude}","${lattitude}",(SELECT id FROM drivers WHERE idCard=${idCard}))`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// GETTING A PREVIEW POSITION FOR THE ONLINE DRIVERS
const getInfo = (email,info, callback) => {
  let syntax = ` UPDATE history SET available = '${info}' WHERE driver_id=(SELECT id FROM drivers WHERE email= '${email}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

//
const submitReq = (request,email, callback) => {
  let syntax = ` INSERT INTO requests(request, picker_id) VALUES('${request}',(SELECT id FROM drivers WHERE email= '${email}'))`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getAllReq = (emailPicker, callback) => {
  let syntax = `SELECT * FROM requests WHERE picker_id=(SELECT id FROM drivers WHERE email= '${emailPicker}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


module.exports.getAllDrivers = getAllDrivers;
module.exports.addNewDriver = addNewDriver;
module.exports.getADriver = getADriver;
module.exports.getEmailAndPassword = getEmailAndPassword;
module.exports.getHistory = getHistory;
module.exports.createHistory = createHistory;
module.exports.getInfo = getInfo;
module.exports.submitReq = submitReq;
module.exports.getAllReq = getAllReq;
