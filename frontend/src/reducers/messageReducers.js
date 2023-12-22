import {
 MESSAGE_SUCCESS,
 MESSAGE_FAIL,
 MESSAGE_REQUEST,
CLEAR_ERRORS
} from "../constants/messageConstants"

export const newMessageReduce = (state={ message :{}} , action)=>{
  switch(action.type) {
    case MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case MESSAGE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          message: action.payload.message,
        };
    case MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
          
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
    default:
      return state;
  }
}