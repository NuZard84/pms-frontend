import { SET_USER_DETAILS, SET_USER_IS_DOCTOR, LOGOUT_USER } from "../types";

const initialState = {
  userDetail: null,
  isDoctor: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          ...action.payload,
        },
      };

    case SET_USER_IS_DOCTOR:
      return {
        ...state,
        isDoctor: action.payload,
      };

    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
