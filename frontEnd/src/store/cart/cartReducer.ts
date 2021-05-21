import { cartTypes, ITEM_IN_CART } from "./cartTypes";

interface DefaultState {
  items: Array<ITEM_IN_CART>;
  loding: boolean;
}
const initialState: DefaultState = {
  items: [],
  loding: false,
};

const itemsReducer = (
  state: DefaultState = initialState,
  action: cartTypes
) => {
  switch (action.type) {
    case "FAIL_CART": {
      return { ...state, loding: false };
    }
    case "LOADING_CART": {
      return {
        ...state,
        loding: true,
      };
    }
    case "GET_CART_ITEMS": {
      return { items: action.payload, loding: false };
    }
    case "SET_NEW_ITEM": {
      return {
        items: Array.isArray(action.payload)
          ? action.payload
          : state.items !== null
          ? [...state.items, action.payload]
          : [action.payload],
        loding: false,
      };
    }
    case "CHANGE_QUANTITY": {
      return {
        items: action.payload,
        loding: false,
      };
    }
    case "REMOVE_ITEM_FROM_CART": {
      return {
        items: action.payload,
        loding: false,
      };
    }
    default:
      return { ...state };
  }
};

export default itemsReducer;
