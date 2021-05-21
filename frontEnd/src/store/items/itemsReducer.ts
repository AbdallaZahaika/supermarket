import { itemsTypes, ITEM } from "./itemsTypes";

interface DefaultState {
  items: Array<ITEM>;
  loading: boolean;
  pages: number;
  searchVal: object;
  searchOptions: Array<string>;
}
const initialState: DefaultState = {
  items: [],
  loading: false,
  pages: 0,
  searchVal: {},
  searchOptions: [],
};

const itemsReducer = (
  state: DefaultState = initialState,
  action: itemsTypes
) => {
  switch (action.type) {
    case "FAIL_ITEMS": {
      return { ...state, loading: false };
    }
    case "LOADING_ITEMS": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CLEAR_ITEMS": {
      return {
        items: [],
        loading: false,
        pages: 0,
        searchVal: {},
        searchOptions: [],
      };
    }
    case "SET_ITEMS": {
      return {
        ...state,
        items: action.payload.data,
        loading: false,
        pages: action.payload.pages,
      };
    }
    case "SEARCH_VALUE": {
      return { ...state, searchVal: action.payload, loading: false };
    }
    case "NEW_ITEM": {
      return { ...state, loading: false };
    }
    case "DELETE_ITEM": {
      return { ...state, loading: false };
    }
    case "GET_ITEM_BY_ID": {
      return { ...state, loading: false };
    }
    case "EDIT_ITEM": {
      return { ...state, loading: false };
    }
    case "REMOVE_IMAGE_FROM_SERVER": {
      return { ...state, loading: false };
    }
    case "SET_NEW_IMAGE_IN_SERVER": {
      return { ...state, loading: false };
    }
    case "SEARCH_OPTIONS": {
      return { ...state, searchOptions: action.payload, loading: false };
    }

    default:
      return { ...state };
  }
};

export default itemsReducer;
