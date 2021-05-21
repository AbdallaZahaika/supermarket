/* eslint-disable @typescript-eslint/no-redeclare */
export const LOADING_ITEMS = "LOADING_ITEMS";
export const FAIL_ITEMS = "FAIL_ITEMS";
export const CLEAR_ITEMS = "CLEAR_ITEMS";
export const SET_ITEMS = "SET_ITEMS";
export const DELETE_ITEM = "DELETE_ITEM";
export const NEW_ITEM = "NEW_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const REMOVE_IMAGE_FROM_SERVER = "REMOVE_IMAGE_FROM_SERVER";
export const SET_NEW_IMAGE_IN_SERVER = "SET_NEW_IMAGE_IN_SERVER";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const SEARCH_VALUE = "SEARCH_VALUE";
export const SEARCH_OPTIONS = "SEARCH_OPTIONS";

export interface ITEM {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: { file: { path: string } };
  type: string;
  quantityInStore: number;
  discount: number;
  soldBy: string;
  category: string;
}
export interface NEW_ITEM_INTERFACE {
  name: string;
  price: number;
  description?: string;
  image: { file: { path: string } };
  type: string;
  quantityInStore: number;
  discount: number;
  soldBy: string;
  category: string;
}
export interface EDIT_ITEM_INTERFACE {
  name: string;
  price: number;
  description?: string;
  image: { file: { path: string } };
  type: string;
  quantityInStore: number;
  discount: number;
  soldBy: string;
  _id: string;
  category: string;
}

export interface LOADING_ITEMS {
  type: typeof LOADING_ITEMS;
}
export interface GET_ITEM_BY_ID {
  type: typeof GET_ITEM_BY_ID;
}
export interface FAIL_ITEMS {
  type: typeof FAIL_ITEMS;
}
export interface SEARCH_OPTIONS {
  type: typeof SEARCH_OPTIONS;
  payload: Array<string>;
}
export interface CLEAR_ITEMS {
  type: typeof CLEAR_ITEMS;
}
export interface SEARCH_VALUE {
  type: typeof SEARCH_VALUE;
  payload: object;
}

export interface SET_ITEMS {
  type: typeof SET_ITEMS;
  payload: { data: Array<ITEM>; pages: number };
}
export interface NEW_ITEM {
  type: typeof NEW_ITEM;
}
export interface DELETE_ITEM {
  type: typeof DELETE_ITEM;
}
export interface EDIT_ITEM {
  type: typeof EDIT_ITEM;
}
export interface REMOVE_IMAGE_FROM_SERVER {
  type: typeof REMOVE_IMAGE_FROM_SERVER;
}
export interface SET_NEW_IMAGE_IN_SERVER {
  type: typeof SET_NEW_IMAGE_IN_SERVER;
}

export type itemsTypes =
  | LOADING_ITEMS
  | FAIL_ITEMS
  | CLEAR_ITEMS
  | SET_ITEMS
  | NEW_ITEM
  | DELETE_ITEM
  | EDIT_ITEM
  | REMOVE_IMAGE_FROM_SERVER
  | SET_NEW_IMAGE_IN_SERVER
  | GET_ITEM_BY_ID
  | SEARCH_VALUE
  | SEARCH_OPTIONS;
