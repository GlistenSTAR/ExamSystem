const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userid = !isEmpty(data.userid) ? data.userid : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.userid)) {
    errors.userid = 'AdminID field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
