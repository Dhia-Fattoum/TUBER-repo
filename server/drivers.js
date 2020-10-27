const express = require("express");
const db = require("../database/index.js");
const router = express.Router();

router.post("/signup", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const yearOfBirth = req.body.yearOfBirth;
  const idCard = req.body.idCard;
  const driveLicense = req.body.driveLicense;
  const car = req.body.car;
  const location = req.body.location;
  const km = req.body.km;
  const gender = req.body.gender;
  const rate = 10;
  db.getADriver(email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        db.addNewDriver(
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
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json("Done");
            }
          }
        );
      } else {
        res.status(200).json("Email already exists");
      }
    }
  });
});
router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.getEmailAndPassword(email, password, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (
        result.length !== 0 &&
        password === result[0].password &&
        email === result[0].email
      ) {
        res.status(200).json("OK");
      } else {
        res.status(200).json("NO");
      }
    }
  });
});
router.post("/history/add", (req, res) => {
  const longtitude = req.body.longtitude;
  const lattitude = req.body.lattitude;
  const idCardDrive = req.body.idCard;
  db.createHistory(longtitude, lattitude, idCardDrive, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done");
    }
  });
});

router.post("/history", (req, res) => {
  const id = req.body.idCard;
  db.getHistory(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
});

// POST REQUEST TO UPDATE STATUS 

router.post('/status',(req,res)=>{
  let emailDriver = req.body.email;
  let info = req.body.info;
  db.getInfo(emailDriver,info,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.status(200).json(result)
    }
  })

});

router.post('/request',(req,res)=>{
  let emailPicker = req.body.email;
  let request = req.body.request;
  if(!req.body.answer){
  db.submitReq(request,emailPicker,(err,result)=>{
    if(err){
      console.log(err)
    }else{
        console.log('waiting for answer')
    }
  })
  }else{
    res.status(200).json(req.body.answer)
  }
})

router.post('/requests/answer',(req,res)=>{
  let emailPicker = req.body.email;
  db.getAllReq(emailPicker,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.status(200).json(result)
    }
  })
})

module.exports = router;
