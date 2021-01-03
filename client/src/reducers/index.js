import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import answerReducer from './answerReducer';
import problemReducer from './problemReducer';
import adminmReducer from './adminReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  answer: answerReducer,
  problems: problemReducer,
  admin: adminmReducer
});
