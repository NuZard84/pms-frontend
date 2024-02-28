const initialState = {
  loading: false,
  loginLoading: false,
  errors: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case "LOADING_UI":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING_UI":
      return {
        ...state,
        loading: false,
      };
    case "LOGIN_LOADING":
      return {
        ...state,
        loginLoading: true,
      };
    case "LOGIN_STOP_LOADING":
      return {
        ...state,
        loginLoading: false,
      };
    default:
      return state;
  }
};
