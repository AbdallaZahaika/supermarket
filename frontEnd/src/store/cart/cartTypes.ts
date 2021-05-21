/* eslint-disable @typescript-eslint/no-redeclare */
export const LOADING_CART = "LOADING_CART";
export const FAIL_CART = "FAIL_CART";
export const CLEAR_CART = "CLEAR_CART";
export const SET_NEW_ITEM = "SET_NEW_ITEM";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const GET_CART_ITEMS = "GET_CART_ITEMS";

export interface ITEM_IN_CART {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: { file: { path: string } };
  quantity: number;
  discount: number;
  soldBy: string;
  quantityInStore: number;
  category: string;
}
export interface LOADING_CART {
  type: typeof LOADING_CART;
}
export interface FAIL_CART {
  type: typeof FAIL_CART;
}
export interface CLEAR_CART {
  type: typeof CLEAR_CART;
}
export interface SET_NEW_ITEM {
  type: typeof SET_NEW_ITEM;
  payload: ITEM_IN_CART | Array<ITEM_IN_CART>;
}
export interface REMOVE_ITEM_FROM_CART {
  type: typeof REMOVE_ITEM_FROM_CART;
  payload: Array<ITEM_IN_CART>;
}

export interface CHANGE_QUANTITY {
  type: typeof CHANGE_QUANTITY;
  payload: Array<ITEM_IN_CART>;
}

export interface GET_CART_ITEMS {
  type: typeof GET_CART_ITEMS;
  payload: Array<ITEM_IN_CART>;
}

export type cartTypes =
  | LOADING_CART
  | FAIL_CART
  | CLEAR_CART
  | SET_NEW_ITEM
  | REMOVE_ITEM_FROM_CART
  | CHANGE_QUANTITY
  | GET_CART_ITEMS;
