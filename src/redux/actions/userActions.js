import { SERVER_API, VB_SERVER_API, DIPAL_SERVER_API } from "../../config";
import { LOGIN_LOADING, SET_USER_DETAILS, STOP_LOGIN_LOADING } from "../types";
import axios from "axios";

export const AuthLoginPost =
  (userData, toast, navigate) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_LOADING });
      console.log(userData);
      const res = await axios.post(`${SERVER_API}/auth/login`, userData);
      dispatch({ type: SET_USER_DETAILS, payload: [] });
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
      if (res.data.user.isDetailsFilled) {
        navigate("/dashboard");
      } else {
        navigate("/doctor/filldetails");
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
