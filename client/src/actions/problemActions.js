import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  GET_PROBLEMS,
  GET_EXAMINAIONS
} from './types';

//get problems
export const getQuestion = (data) => dispatch =>{
  axios
    .post('/api/problem/getProblem', data)
    .then(res => dispatch({
      type: GET_PROBLEMS,
      payload: res.data
    }))
    .catch(err => console.log(err));
}
// Add Problem
export const saveProblem = (newdata, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/problem', newdata)
    .then(res =>
      history.push('/dashboard')
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete problem
export const deleteProblem = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this problem?')) {
    axios
      .delete(`/api/problem/${id}`)
      .then(res =>
        dispatch(getQuestion())
      )
      .catch(err =>
        console.log(err)
      );
  }
}

//get exmination
export const getExamination = () => dispatch => {
  const data = { examid: localStorage.examid };
  axios
    .post('/api/problem/getExamination', data)
      .then(res=>
        dispatch({
          type: GET_EXAMINAIONS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
}

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
