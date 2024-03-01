import {
  PATIENT_SET_IS_DOCTOR,
  PATIENT_SET_USER_DETAILS,
  PATIENT_UPDATE_TIMELINE_ID,
  PATIENT_UPDATE_TIMELINE,
  LOGOUT_PATIENT,
} from "../types";

const initialState = {
  userDetail: null,
  Timeline: [],
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
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
};

export default patientReducer;
