import { ADD_PROJECT, PNAMECHANGE } from "../action/actionTypes";

const initialstate = {
  projects: [],
  pname: "",
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case PNAMECHANGE:
      return {
        ...state,
        pname: action.data,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: action.data,
      };
    default:
      return state;
  }
};

export default func;
