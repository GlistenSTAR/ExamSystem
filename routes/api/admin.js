const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Input Validation
const validateAdminLoginInput = require('../../validation/adminlogin');

// Load User model
const AdminUser = require('../../models/AdminUser');
const User = require('../../models/User');
const Problem = require('../../models/Problem');
const ExamResult = require('../../models/ExamResult');
const Exam = require('../../models/ExamInfo');
const ExamInfo = require('../../models/ExamInfo');

//admin login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateAdminLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userid = req.body.userid;
  const password = req.body.password;

  //Find user by email
  AdminUser.findOne({ userid }).then(user => {
    // Check for user
    if (!user) {
      errors.userid = 'User not found';
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Match
        res.json({success: true});
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });  
});

//get student
router.get('/getStudent', (req, res)=>{
  User.find({role: "student"})
    .then(studens=> res.json(studens))
    .catch(err => console.log(err));
})

//delete student
router.delete('/deleteStudent/:id',(req, res)=>{
  User.findOneAndRemove({_id:req.params.id})
    .then(()=>
        res.json({sucess: true})
      )
    .catch(err=> console.log(err));  
})

//get teachers
router.get('/getTeacher', (req, res)=>{
  User.find({role: "teacher"})
    .then(teachers=> res.json(teachers))
    .catch(err => console.log(err));
})

//delete teacher
router.delete('/deleteTeacher/:id',(req, res)=>{
  User.findOneAndRemove({_id:req.params.id})
    .then(()=>
        res.json({sucess: true})
      )
    .catch(err=> console.log(err));  
})

//get all problems
router.get('/getProblem', (req, res)=>{
  Problem.find({})
    .then(teachers=> res.json(teachers))
    .catch(err => console.log(err));
})


//delete problem
router.delete('/deleteProblem/:id',(req, res)=>{
  Problem.findOneAndRemove({_id:req.params.id})
    .then(()=>
        res.json({sucess: true})
      )
    .catch(err=> console.log(err));  
})



//get all results
router.get('/getResult', (req, res)=>{
  ExamResult.find({})
    .then(teachers=> res.json(teachers))
    .catch(err => console.log(err));
})

//delete result
router.delete('/deleteResult/:id',(req, res)=>{
  ExamResult.findOneAndRemove({_id:req.params.id})
    .then(()=>
        res.json({sucess: true})
      )
    .catch(err=> console.log(err));  
})

//get exam data
router.get('/getExam', (req, res)=>{
  Exam.find({})
    .then(Exams=> res.json(Exams))
    .catch(err => console.log(err));
})

//delete exam data
router.delete('/deleteExam/:id',(req, res)=>{
  Exam.findOneAndRemove({_id:req.params.id})
    .then(()=>
        res.json({sucess: true})
      )
    .catch(err=> console.log(err));  
})

//add exam data
router.post(
  '/addExam',
  (req, res) => {
    const newExamInfo = {
      password: req.body.password,
      examid: req.body.examid
    }
    ExamInfo.findOne(newExamInfo).then(result=>{
      if(!result){
        new ExamInfo(newExamInfo).save().then(newExam => res.json(newExam))
        .catch(err => console.log(err));
      } else {
        res.json(result);
      }
    })
  }
)

module.exports = router;