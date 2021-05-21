import { userTypes, USER } from "./userTypes";

interface DefaultState {
  user: USER;
  userActive: boolean;
  loding: boolean;
}
const initialState: DefaultState = {
  user: {
    _id: "",
    name: "",
    admin: false,
    ApartmentNumber: undefined,
    city: "",
    floor: undefined,
    houseNumber: undefined,
    street: "",
    phone: "",
  },
  loding: false,
  userActive: false,
};

const userReducer = (state: DefaultState = initialState, action: userTypes) => {
  switch (action.type) {
    case "FAIL_USER": {
      return { ...state, loding: false };
    }
    case "LOADING_USER": {
      return {
        ...state,
        loding: true,
      };
    }
    case "CLEAR_USER": {
      return {
        user: {
          _id: "",
          name: "",
          admin: false,
          city: "",
          street: "",
          houseNumber: 4,
          floor: 4,
          ApartmentNumber: 5,
          phone: "",
        },
        loding: false,
        userActive: false,
      };
    }
    case "CHECK_USER_SUCCESS": {
      return {
        ...state,
        loding: false,
        userActive: Boolean(action.payload),
      };
    }
    case "SET_USER_IFNO": {
      return {
        ...state,
        loding: false,
        user: action.payload,
      };
    }
    case "EDIT_USER": {
      return {
        ...state,
        loding: false,
        user: {
          _id: state.user._id,
          admin: state.user.admin,
          name: action.payload.name,
          city: action.payload.city,
          street: action.payload.street,
          houseNumber: action.payload.houseNumber,
          floor: action.payload.floor,
          ApartmentNumber: action.payload.ApartmentNumber,
          phone: action.payload.phone,
        },
      };
    }
    case "LOGIN_USER": {
      return {
        ...state,
        loding: false,
      };
    }
    case "LOGOUT_USER": {
      return {
        ...state,
        loding: false,
      };
    }
    case "CHANGE_PASSWORD": {
      return {
        ...state,
        loding: false,
      };
    }
    case "SIGNUP": {
      return {
        ...state,
        loding: false,
      };
    }
    case "SEND_EMAIL_FORGOTEPASSOWRD": {
      return {
        ...state,
        loding: false,
      };
    }
    case "REST_PASSWROD": {
      return {
        ...state,
        loding: false,
      };
    }
    case "CONFIR_MEMAIL": {
      return {
        ...state,
        loding: false,
      };
    }

    default:
      return { ...state };
  }
};

export default userReducer;
