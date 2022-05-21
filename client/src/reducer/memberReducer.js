import { GET_USERS } from "../action/actionTypes";

const initialstate = {
  members: [],
  edit: [],
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        members: action.data,
      };
    default:
      return state;
  }
};

export default func;
