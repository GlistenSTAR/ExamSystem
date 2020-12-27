const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};
  // console.log(data);
  data.answer = !isEmpty(data.answer) ? data.answer : '';
  data.question = !isEmpty(data.question) ? data.question : '';

  if (Validator.isEmpty(data.answer)) {
    errors.answer = 'Answer field is required';
  }

  if (Validator.isEmpty(data.question)) {
    errors.question = 'Question field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
