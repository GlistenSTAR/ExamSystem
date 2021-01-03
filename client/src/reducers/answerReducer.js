import {
  SET_ABLETST,
  CANCEL_ABLETST
} from '../actions/types';

const initialState = {
  pass: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ABLETST:
      return {
        ...state,
        pass: true,
        examid:action.payload
      };
    case CANCEL_ABLETST:
      return {
        ...state,
        pass: false
      }
    default:
      return state;
  }
}
