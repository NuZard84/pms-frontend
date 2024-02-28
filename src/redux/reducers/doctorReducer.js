import {
  DOCTOR_SET_IS_DETAILFILLED,
  DOCTOR_SET_USER_DETAILS,
  DOCTOR_SET_IS_DOCTOR,
} from "../types";

const initialState = {
  isDoctor: false,
  isDetailsFilled: false,
  userDetail: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_SET_IS_DOCTOR:
      return {
        ...state,
        isDoctor: action.payload,
      };

    case DOCTOR_SET_IS_DETAILFILLED:
      return {
        ...state,
        isDetailsFilled: action.payload,
      };

    case DOCTOR_SET_USER_DETAILS:
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
