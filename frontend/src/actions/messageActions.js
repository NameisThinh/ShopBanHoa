import axios from 'axios'

import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  CLEAR_ERRORS
} from '../constants/messageConstants'

//Tao
export const newMessage = (messageData) => async(dispatch)=>{
  try{
    dispatch({ type: MESSAGE_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const {data }= await axios.post(`/api/v1/message/new`,messageData,config)
    dispatch({
      type: MESSAGE_SUCCESS,
      payload:data.success
    })
  }catch (error) {
    dispatch({
      type: MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
