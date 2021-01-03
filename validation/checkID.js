const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCheckIdInput(data) {
  let errors = {};

  data.examid = !isEmpty(data.examid) ? data.examid : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if (Validator.isEmpty(data.examid)) {
    errors.examid = 'ExamId field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  console.log(errors);

  return {
    errors,
    isValid: isEmpty(errors)
  };
};