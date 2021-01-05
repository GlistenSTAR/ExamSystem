const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Problem model
const Problem = require('../../models/Problem');


// Validation
const validateProblemInput = require('../../validation/problem');

//add problem
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProblemInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    
    const newProblem = {
      name: req.body.name,
      question: req.body.question,
      examid: req.body.examid
    };
    newProblem.answer = req.body.answer.split(','); 
    new Problem(newProblem).save().then(problem => res.json(problem)).catch(err => console.log(err));;
  }
);

//get problem
router.post(
  '/getProblem',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Problem.find(req.body)
      .then(problem=>res.json(problem))
      .catch(err=>console.log(err));
  }
);

//delete problem
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // console.log(req.params.id);
      Problem.findOneAndRemove({ _id: req.params.id }).then(() => {
          res.json({ success: true })
      });
    }    
  );

//get exmination
router.post(
  '/getExamination',
  passport.authenticate('jwt', { session: false }),
    (req, res) =>{
      let examd = {examid: req.body.examid};
      Problem.find(examd).then((data)=>{
        res.json(data)
      });
    }
)

module.exports = router;
