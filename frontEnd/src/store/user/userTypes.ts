/* eslint-disable @typescript-eslint/no-redeclare */
export const LOADING_USER = "LOADING_USER";
export const FAIL_USER = "FAIL_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_USER_IFNO = "SET_USER_IFNO";
export const EDIT_USER = "EDIT_USER";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const LOGIN_USER = "LOGIN_USER";
export const SIGNUP = "SIGNUP";
export const LOGOUT_USER = "LOGOUT_USER";
export const CHECK_USER_SUCCESS = "CHECK_USER_SUCCESS";
export const CONFIR_MEMAIL = "CONFIR_MEMAIL";
export const REST_PASSWROD = "REST_PASSWROD";
export const SEND_EMAIL_FORGOTEPASSOWRD = "SEND_EMAIL_FORGOTEPASSOWRD";
export interface USER {
  _id: string;
  name: string;
  admin: boolean;
  city: string;
  street: string;
  houseNumber: number | undefined;
  floor: number | undefined;
  ApartmentNumber: number | undefined;
  phone: string;
}
export interface SIGNUP_INTERFACE {
  email: string;
  password: string;
  city: string;
  street: string;
  houseNumber: number | undefined;
  floor: number | undefined;
  ApartmentNumber: number | undefined;
  name: string;
  phone: string;
}
export interface EDIT_USER_INTERFACE {
  city: string;
  street: string;
  houseNumber: number | undefined;
  floor: number | undefined;
  ApartmentNumber: number | undefined;
  name: string;
  phone: string;
}
export interface CHANGEPASSWORD {
  password: string;
  newPassword: string;
}
export interface LOADING_USER {
  type: typeof LOADING_USER;
}
export interface SIGNUP {
  type: typeof SIGNUP;
}
export interface FAIL_USER {
  type: typeof FAIL_USER;
}
export interface CLEAR_USER {
  type: typeof CLEAR_USER;
}

export interface SET_USER_IFNO {
  type: typeof SET_USER_IFNO;
  payload: USER;
}
export interface CHECK_USER_SUCCESS {
  type: typeof CHECK_USER_SUCCESS;
  payload: string;
}
export interface CONFIR_MEMAIL {
  type: typeof CONFIR_MEMAIL;
}
export interface EDIT_USER {
  type: typeof EDIT_USER;
  payload: EDIT_USER_INTERFACE;
}
export interface CHANGE_PASSWORD {
  type: typeof CHANGE_PASSWORD;
}
export interface LOGIN_USER {
  type: typeof LOGIN_USER;
}

export interface LOGOUT_USER {
  type: typeof LOGOUT_USER;
}
export interface REST_PASSWROD {
  type: typeof REST_PASSWROD;
}
export interface SEND_EMAIL_FORGOTEPASSOWRD {
  type: typeof SEND_EMAIL_FORGOTEPASSOWRD;
}
export type userTypes =
  | LOADING_USER
  | FAIL_USER
  | CLEAR_USER
  | SET_USER_IFNO
  | CHANGE_PASSWORD
  | EDIT_USER
  | CHECK_USER_SUCCESS
  | LOGOUT_USER
  | LOGIN_USER
  | SIGNUP
  | CONFIR_MEMAIL
  | SEND_EMAIL_FORGOTEPASSOWRD
  | REST_PASSWROD;
