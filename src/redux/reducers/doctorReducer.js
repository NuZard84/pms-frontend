import { SET_IS_DETAILFILLED, SET_IS_DOCTOR, SET_USER_DETAILS } from "../types";

const initialState = {
  isDoctor: false,
  isDetailsFilled: false,
  userDetail: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_DOCTOR:
      return {
        ...state,
        isDoctor: action,
        payload,
      };

    case SET_IS_DETAILFILLED:
      return {
        ...state,
        isDetailsFilled: action.payload,
      };

    case SET_USER_DETAILS:
      return {
        ...state,
        userDetail: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default doctorReducer;
