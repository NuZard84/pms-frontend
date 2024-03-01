import {
  DOCTOR_SET_IS_DETAILFILLED,
  DOCTOR_SET_USER_DETAILS,
  DOCTOR_SET_IS_DOCTOR,
  DOCTOR_UPDATE_TIMELINE,
  LOGOUT_DOCTOR,
} from "../types";

const initialState = {
  userDetail: null,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCTOR_SET_USER_DETAILS:
      return {
        ...state,
        userDetail: {
          ...action.payload,
        },
      };

    case DOCTOR_UPDATE_TIMELINE:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          timeline: action.payload,
        },
      };

    case LOGOUT_DOCTOR:
      return initialState;

    default:
      return state;
  }
};

export default doctorReducer;
