import isEmpty from '../validation/is-empty';

import { GET_STUDENTS, SET_CURRENT_ADMIN, GET_TEACHERS, GET_ALL_PROBLEMS, GET_ALL_RESULTS, GET_ALL_EXAMS } from '../actions/types';

const initialState = {
  isADMIN: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isADMIN: !isEmpty(action.payload)
      };
    case GET_STUDENTS:
      return{
        ...state,
        students: action.payload
      }
    case GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload
      }
    case GET_ALL_PROBLEMS:
      return {
        ...state,
        problems: action.payload
      }
    case GET_ALL_RESULTS:
      return{
        ...state,
        results: action.payload
      }
    case GET_ALL_EXAMS:
      return{
        ...state,
        exams: action.payload
      }
    default:
      return state;
  }
}
