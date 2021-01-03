import axios from 'axios';

import { GET_ERRORS, SET_CURRENT_ADMIN, GET_STUDENTS, GET_TEACHERS, GET_ALL_PROBLEMS,GET_ALL_RESULTS , GET_ALL_EXAMS } from './types';


// Login - Get admin Token
export const Adminlogin = userData => dispatch => {
  axios
    .post('/api/admin/login', userData)
    .then(res => {
      window.sessionStorage.isADMIN = true;
      dispatch(setCurrentAdmin(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentAdmin  = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded 
  };
};

//get students
export const getStudent = () => dispatch =>{
  // console.log("asdf");
  axios
    .get('/api/admin/getStudent')
    .then(res =>{  
      dispatch({
        type:GET_STUDENTS,
        payload: res.data
      })
    }).catch(err=> console.log(err));
}
// delete student
export const deleteStudent = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this student?')) {
  axios
    .delete(`/api/admin/deleteStudent/${id}`)
    .then(res=> history.push('/admin'))
    .catch(err=> console.log(err));
  }
}

//get teachers
export const getteacher = () => dispatch =>{
  // console.log("asdf");
  axios
    .get('/api/admin/getTeacher')
    .then(res =>{  
      dispatch({
        type:GET_TEACHERS,
        payload: res.data
      })
    }).catch(err=> console.log(err));
}

//delete teacher
export const deleteteacher = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this teacher?')) {
  axios
    .delete(`/api/admin/deleteTeacher/${id}`)
    .then(res=> history.push('/admin'))
    .catch(err=> console.log(err));
  }
}

//get all problems
export const getproblem = () => dispatch =>{
  // console.log("asdf");
  axios
    .get('/api/admin/getProblem')
    .then(res =>{  
      dispatch({
        type:GET_ALL_PROBLEMS,
        payload: res.data
      })
    }).catch(err=> console.log(err));
}

//delete teacher
export const deleteproblem = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this problem?')) {
    axios
      .delete(`/api/admin/deleteProblem/${id}`)
      .then(res=> history.push('/admin'))
      .catch(err=> console.log(err));
    }
}

//get Result
export const getResult = () => dispatch =>{
  axios
    .get('/api/admin/getResult')
    .then(res =>{  
      dispatch({
        type:GET_ALL_RESULTS,
        payload: res.data
      })
    }).catch(err=> console.log(err));
}

//delet examResult
export const deleteResult = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this Exam Result?')) {
    axios
      .delete(`/api/admin/deleteResult/${id}`)
      .then(()=> history.push('/admin'))
      .catch(err=> console.log(err));
    }
}

//get Exam data
export const getExam = () => dispatch =>{
  axios
    .get('/api/admin/getExam')
    .then(res =>{  
      dispatch({
        type:GET_ALL_EXAMS,
        payload: res.data
      })
    }).catch(err=> console.log(err));
}

//add exam data
export const saveExamInfo = (data, history) => dispatch =>{
  axios
    .post('/api/admin/addExam', data)
    .then(res => {
      history.push('/exammgr');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

//delete Exam data
export const deleteExam = (id, history) => dispatch =>{
  if (window.confirm('Are you sure delete this Exam Data?')) {
    axios
      .delete(`/api/admin/deleteExam/${id}`)
      .then(()=> history.push('/admin'))
      .catch(err=> console.log(err));
    }
}
