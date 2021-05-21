import { Dispatch } from "redux";
import { ITEM } from "../items/itemsTypes";
import {
  CLEAR_CART,
  REMOVE_ITEM_FROM_CART,
  FAIL_CART,
  GET_CART_ITEMS,
  LOADING_CART,
  SET_NEW_ITEM,
  cartTypes,
  CHANGE_QUANTITY,
  // ITEM_IN_CART,
} from "./cartTypes";

//// localStorage CART KEY
const CART_KEY = "CART_KEY";

export const get_cart_items = () => async (dispatch: Dispatch<cartTypes>) => {
  try {
    dispatch({
      type: LOADING_CART,
    });

    const getFromLocalStorage: any = localStorage.getItem(CART_KEY);

    const get_cart_items = JSON.parse(getFromLocalStorage);

    dispatch({
      type: GET_CART_ITEMS,
      payload: get_cart_items,
    });
    return get_cart_items;
  } catch (err) {
    dispatch({
      type: FAIL_CART,
    });
    return err;
  }
};
export const new_item_in_cart = (quantity: number, itemInfo: ITEM) => async (
  dispatch: Dispatch<cartTypes>
) => {
  try {
    dispatch({
      type: LOADING_CART,
    });

    const getFromLocalStorage: any = localStorage.getItem(CART_KEY);

    const get_cart_items = JSON.parse(getFromLocalStorage);
    if (get_cart_items) {
      const checkItem = get_cart_items.filter(
        (item: any) => item._id === itemInfo._id
      );

      if (checkItem.length) {
        const data = get_cart_items.map((item: any) => {
          if (item._id === itemInfo._id) {
            item.quantity += quantity;
          }
          return item;
        });
        localStorage.setItem(CART_KEY, JSON.stringify(data));
        dispatch({
          type: SET_NEW_ITEM,
          payload: data,
        });
        return;
      }
      localStorage.setItem(
        CART_KEY,
        JSON.stringify([
          ...get_cart_items,
          {
            ...itemInfo,
            quantity,
          },
        ])
      );
    } else {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify([
          {
            ...itemInfo,
            quantity,
          },
        ])
      );
    }

    dispatch({
      type: SET_NEW_ITEM,
      payload: { ...itemInfo, quantity },
    });
    return "data";
  } catch (err) {
    dispatch({
      type: FAIL_CART,
    });
    return err;
  }
};

export const clearItemsState = () => async (dispatch: Dispatch<cartTypes>) => {
  dispatch({
    type: LOADING_CART,
  });

  dispatch({
    type: CLEAR_CART,
  });

  dispatch({
    type: FAIL_CART,
  });
};
export const changeQuantity = (
  _id: string,
  type: "decrement" | "increment"
) => async (dispatch: Dispatch<cartTypes>) => {
  dispatch({
    type: LOADING_CART,
  });
  const getFromLocalStorage: any = localStorage.getItem(CART_KEY);

  const get_cart_items = JSON.parse(getFromLocalStorage);
  const data = get_cart_items.map((item: any) => ({
    ...item,
    quantity:
      item._id === _id
        ? type === "increment"
          ? (item.quantity += 1)
          : (item.quantity -= 1)
        : item.quantity,
  }));
  localStorage.setItem(CART_KEY, JSON.stringify(data));
  dispatch({
    type: CHANGE_QUANTITY,
    payload: data,
  });

  dispatch({
    type: FAIL_CART,
  });
};

export const remove_item_from_cart = (_id: string) => async (
  dispatch: Dispatch<cartTypes>
) => {
  dispatch({
    type: LOADING_CART,
  });
  const getFromLocalStorage: any = localStorage.getItem(CART_KEY);

  const get_cart_items = JSON.parse(getFromLocalStorage);
  const data = get_cart_items.filter((item: any) => item._id !== _id);
  localStorage.setItem(CART_KEY, JSON.stringify(data));
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: data,
  });

  dispatch({
    type: FAIL_CART,
  });
};
