import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_ABLETST,
  CANCEL_ABLETST
} from './types';

//check examid
export const checkExam = (data, history) => dispatch =>{
  dispatch(clearErrors());
  axios
    .post('/api/answer', data)
    .then(res=>{
      localStorage.setItem('pass', true);
      localStorage.setItem('examid', data.examid);
      dispatch({
        type: SET_ABLETST
      });
      history.push('/examination');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
//save result
export const saveExamination = (data, history) => dispatch =>{
  axios
    .post('api/answer/saveResult', data)
    .then(res => {
      if(res.data.errors){
        alert(res.data.errors);
        history.push('/examination');
      } else {
        alert("Correctly sended to server");
        dispatch({
          type: CANCEL_ABLETST
        });
        history.push('/dashboard');  
      }
      
    })
    .catch(err => console.log(err))
}
//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
