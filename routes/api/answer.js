const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateCheckIdInput = require('../../validation/checkID');

// Load Profile Model
const ExamInfo = require('../../models/ExamInfo');
// Load User Model
const ExamResult = require('../../models/ExamResult');

const isEmpty = require('../../validation/is-empty');

//check examid
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateCheckIdInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log(req.body);
    ExamInfo.find(req.body)
      .then(profile => {
        if (!profile) {
          errors.examid = 'There is no examID or incorrect password';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//register exam
router.post(
  '/addExamId',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const newExamInfo = {
      examid: req.body.examid,
      password: req.body.password
    }

    new ExamInfo(newExamInfo).save().then(newExam => res.json(newExam))
      .catch(err => console.log(err));
  }
);

//save result
router.post(
  '/saveResult',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const newExamInfo = {
      user: req.body.name,
      result: req.body.examanswer,
      examid: req.body.examid
    }
    if (isEmpty(newExamInfo.result)) {
      const errors = "Please select the exam answer!";;
      return res.status(400).json(errors);
    }
    new ExamResult(newExamInfo).save().then(newExam => res.json(newExam))
      .catch(err => console.log(err));
  }
)


module.exports = router;