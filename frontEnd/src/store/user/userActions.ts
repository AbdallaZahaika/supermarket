import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import http from "../../services/http";
import {
  CHECK_USER_SUCCESS,
  CLEAR_USER,
  EDIT_USER,
  FAIL_USER,
  LOADING_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER_IFNO,
  CHANGE_PASSWORD,
  userTypes,
  CHANGEPASSWORD,
  SIGNUP,
  CONFIR_MEMAIL,
  SIGNUP_INTERFACE,
  REST_PASSWROD,
  SEND_EMAIL_FORGOTEPASSOWRD,
} from "./userTypes";

const tokenKey: string = "tokenKey";
const refreshTokenKey: string = "refreshTokenKey";

export const setUserInfo = () => async (dispatch: Dispatch<userTypes>) => {
  try {
    dispatch({
      type: LOADING_USER,
    });
    const { data } = await http.get("/users/me");
    dispatch({
      type: SET_USER_IFNO,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: FAIL_USER,
    });
    return err;
  }
};

export const login =
  (dataBody: { email: string; password: string }) =>
  async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });

      const { data } = await http.post("/auth", dataBody);

      dispatch({
        type: LOGIN_USER,
      });

      localStorage.setItem(tokenKey, data.token);
      localStorage.setItem(refreshTokenKey, data.refreshToken);
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });
      return err;
    }
  };
export const signUp =
  (dataBody: SIGNUP_INTERFACE) => async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });

      const { data } = await http.post("/users", dataBody);

      dispatch({
        type: SIGNUP,
      });

      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });
      return err;
    }
  };

export const confirmEmail =
  (token: string) => async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });
      console.log(token);
      const res = await http.put(`/users/confirm-email/${token}`);
      const data = res.data;
      dispatch({
        type: CONFIR_MEMAIL,
      });
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });
      return err;
    }
  };

export const logout = () => async (dispatch: Dispatch<userTypes>) => {
  try {
    dispatch({
      type: LOADING_USER,
    });
    dispatch({
      type: LOGOUT_USER,
    });
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(refreshTokenKey);
  } catch (err) {
    dispatch({
      type: FAIL_USER,
    });
    return err;
  }
};

export const cheackUser = () => async (dispatch: Dispatch<userTypes>) => {
  try {
    dispatch({
      type: LOADING_USER,
    });
    const jwt: string = localStorage.getItem(tokenKey) || "";
    dispatch({
      type: CHECK_USER_SUCCESS,
      payload: jwtDecode(jwt),
    });
  } catch (err) {
    dispatch({
      type: CHECK_USER_SUCCESS,
      payload: "",
    });
  }
};

export const editUser =
  (dataBody: {
    city: string;
    street: string;
    houseNumber: number | undefined;
    floor: number | undefined;
    ApartmentNumber: number | undefined;
    name: string;
    phone: string;
  }) =>
  async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });
      const { data } = await http.put("/users/edit", dataBody);
      dispatch({
        type: EDIT_USER,
        payload: dataBody,
      });
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });
      return err;
    }
  };

export const restPasswrod =
  (newPassword: string, resetLink: string) =>
  async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });
      const { data } = await http.put("/users/reset-password", {
        resetLink,
        newPassword,
      });
      dispatch({
        type: REST_PASSWROD,
      });
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });

      return err;
    }
  };
export const sendEmailForgotPassword =
  (email: string) => async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });
      const { data } = await http.put("/users/forgotPassword", { email });
      dispatch({
        type: SEND_EMAIL_FORGOTEPASSOWRD,
      });
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });

      return err;
    }
  };

export const chagnePassword =
  (dataBody: CHANGEPASSWORD) => async (dispatch: Dispatch<userTypes>) => {
    try {
      dispatch({
        type: LOADING_USER,
      });
      const { data } = await http.put("/users/changePassword", dataBody);
      dispatch({
        type: CHANGE_PASSWORD,
      });
      return data;
    } catch (err) {
      dispatch({
        type: FAIL_USER,
      });
      return err;
    }
  };

export const clearUserState = () => async (dispatch: Dispatch<userTypes>) => {
  dispatch({
    type: LOADING_USER,
  });

  dispatch({
    type: CLEAR_USER,
  });

  dispatch({
    type: FAIL_USER,
  });
};
