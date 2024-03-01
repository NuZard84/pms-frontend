import {
  PATIENT_SET_IS_DOCTOR,
  PATIENT_SET_USER_DETAILS,
  PATIENT_UPDATE_TIMELINE_ID,
  PATIENT_UPDATE_TIMELINE,
  LOGOUT_PATIENT,
} from "../types";

const initialState = {
  isDoctor: false,
  // isDetailsFilled: false,
  userDetail: null,
  Timeline: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PATIENT_SET_IS_DOCTOR:
      return {
        ...state,
        isDoctor: action.payload,
      };

    // case SET_IS_DETAILFILLED:
    //   return {
    //     ...state,
    //     isDetailsFilled: action.payload,
    //   };

    case PATIENT_SET_USER_DETAILS:
      return {
        ...state,
        userDetail: {
          ...action.payload,
        },
      };

    case PATIENT_UPDATE_TIMELINE:
      return {
        ...state,
        Timeline: action.payload,
      };
    case LOGOUT_PATIENT:
      return initialState;

    default:
      return state;
  }
}
