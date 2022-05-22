import {
  LOGIN_SETSUSERNAME,
  LOGIN_SETSEMAIL,
  LOGIN_LOGIN_ERROR,
  LOGIN_SETSPASSWORD,
  LOGIN_SIGNUP_ERROR,
  LOGIN_SIGNUP_USER,
  LOGIN_SIGNUP_TOKEN,
  LOGIN_SETLEMAIL,
  LOGIN_SETLPASSWORD,
} from "./../action/actionTypes";

const initialstate = {
  susername: "",
  semail: "",
  signuperror: false,
  user: {
    name: "",
    invites: [],
  },
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case LOGIN_SETSUSERNAME:
      return {
        ...state,
        susername: action.data,
      };
    case LOGIN_SETSEMAIL:
      return {
        ...state,
        semail: action.data,
      };
    case LOGIN_SETSPASSWORD:
      return {
        ...state,
        spassword: action.data,
      };
    case LOGIN_SIGNUP_ERROR:
      return {
        ...state,
        signuperror: action.data,
      };
    case LOGIN_SIGNUP_USER:
      return {
        ...state,
        user: action.data,
      };
    case LOGIN_SIGNUP_TOKEN:
      return {
        ...state,
        token: action.data,
      };
    case LOGIN_SETLEMAIL:
      return {
        ...state,
        lemail: action.data,
      };
    case LOGIN_SETLPASSWORD:
      return {
        ...state,
        lpassword: action.data,
      };
    case LOGIN_LOGIN_ERROR:
      return {
        ...state,
        loginerror: action.data,
      };
    default:
      return state;
  }
};

export default func;
