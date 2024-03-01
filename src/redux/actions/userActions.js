import { SERVER_API, VB_SERVER_API, DIPAL_SERVER_API } from "../../config";
import {
  DOCTOR_SET_USER_DETAILS,
  LOGIN_LOADING,
  PATIENT_SET_USER_DETAILS,
  STOP_LOGIN_LOADING,
  LOGOUT_DOCTOR,
  LOGOUT_PATIENT,
  LOGOUT_USER,
  SET_USER_DETAILS,
  SET_USER_IS_DOCTOR,
} from "../types";
import axios from "axios";

export const AuthLoginPost =
  (userData, toast, navigate) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_LOADING });
      console.log(userData);
      const res = await axios.post(`${SERVER_API}/auth/login`, userData);

      console.log("redux doc");
      dispatch({ type: SET_USER_IS_DOCTOR, payload: userData.isDoctor });
      dispatch({ type: SET_USER_DETAILS, payload: res.data.user });

      console.log("hello auth login");
      toast({
        title: "Login successful.",
        description: "We've logged in you successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      dispatch({ type: STOP_LOGIN_LOADING });
      if (userData.isDoctor) {
        if (res.data.user.isDetailsFilled) {
          navigate("/dashboard");
        } else {
          navigate("/doctor/filldetails");
        }
      } else {
        navigate("/dashboard");
      }
      console.log(res);
    } catch (error) {
      dispatch({ type: STOP_LOGIN_LOADING });
      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Check your credential and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
  };

export const AuthRegisterPost =
  (userData, toast, navigate) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_LOADING });
      const res = await axios.post(`${SERVER_API}/auth/register`, userData);

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      dispatch({ type: SET_USER_IS_DOCTOR, payload: userData.isDoctor });
      dispatch({ type: SET_USER_DETAILS, payload: res.data.user });
      dispatch({ type: STOP_LOGIN_LOADING });
      navigate("/dashboard");
      console.log(res);
    } catch (error) {
      dispatch({ type: STOP_LOGIN_LOADING });

      console.log(error);
      toast({
        title: "Something went wrong",
        description: "Internal error happened, Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
  };

export const LogOutUser = () => ({
  type: LOGOUT_USER,
});
