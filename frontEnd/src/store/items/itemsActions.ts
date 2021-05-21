import { Dispatch } from "redux";
import {
  SET_ITEMS,
  itemsTypes,
  CLEAR_ITEMS,
  FAIL_ITEMS,
  LOADING_ITEMS,
  NEW_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  REMOVE_IMAGE_FROM_SERVER,
  SET_NEW_IMAGE_IN_SERVER,
  GET_ITEM_BY_ID,
  SEARCH_VALUE,
  SEARCH_OPTIONS,
} from "./itemsTypes";

import http from "../../services/http";

export const setItems = (type: string, category?: string) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  try {
    dispatch({
      type: LOADING_ITEMS,
    });
    let quiry = `/items/?type=${type}${
      category ? (category !== "All" ? `&category=${category}` : "") : ""
    }`;

    const { data } = await http.get(quiry);
    dispatch({
      type: SET_ITEMS,
      payload: data,
    });
    return data;
  } catch (err) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return err;
  }
};
export const search = (searchValue: any, page = 0) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  try {
    dispatch({
      type: LOADING_ITEMS,
    });
    const {
      type,
      sort,
      searchInput,
      minPrice,
      maxPrice,
      category,
    } = searchValue;

    let quiry = `/items/?
    page=${page}&type=${type}
    
    ${category ? (category !== "All" ? "&category=" + category : "") : ""}
    ${sort ? "&sort=" + sort : ""}
    ${minPrice ? "&minPrice=" + minPrice : ""}
    ${maxPrice ? "&maxPrice=" + maxPrice : ""}
    `;
    const { data } = await http.get(
      `${quiry.replace(/\s+/g, "")}${searchInput ? "&name=" + searchInput : ""}`
    );
    dispatch({
      type: SET_ITEMS,
      payload: data,
    });
    return "data";
  } catch (err) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return err;
  }
};

export const createItem = (dataBody: any) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.post(`/items`, dataBody);
    dispatch({
      type: NEW_ITEM,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const deleteItem = (_id: string) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.delete(`/items/${_id}`);
    dispatch({
      type: DELETE_ITEM,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const removeImageFromServer = (image: any) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.put(`/uploadImage`, { image });
    dispatch({
      type: REMOVE_IMAGE_FROM_SERVER,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const setImageFromServer = (image: any) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.post(`/uploadImage`, image);
    dispatch({
      type: SET_NEW_IMAGE_IN_SERVER,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const editItem = (dataBody: any) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.put(`/items`, dataBody);
    dispatch({
      type: EDIT_ITEM,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const get_item_by_id = (_id: string) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    const { data } = await http.get(`/items/item/${_id}`);
    dispatch({
      type: GET_ITEM_BY_ID,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const searchOptions = (type: string, category?: string) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });
  try {
    let quiry = `/items/items-name/?type=${type}${
      category ? (category !== "All" ? `&category=${category}` : "") : ""
    }`;
    const { data } = await http.get(quiry);
    dispatch({
      type: SEARCH_OPTIONS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: FAIL_ITEMS,
    });
    return error;
  }
};
export const clearItemsState = () => async (dispatch: Dispatch<itemsTypes>) => {
  dispatch({
    type: LOADING_ITEMS,
  });

  dispatch({
    type: CLEAR_ITEMS,
  });

  dispatch({
    type: FAIL_ITEMS,
  });
};
//// this for pagination
export const searchValue = (dataBody: any) => async (
  dispatch: Dispatch<itemsTypes>
) => {
  dispatch({
    type: LOADING_ITEMS,
  });

  dispatch({
    type: SEARCH_VALUE,
    payload: dataBody,
  });

  dispatch({
    type: FAIL_ITEMS,
  });
};
