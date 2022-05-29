import { SET_MEMBERS, MAKE_ADMIN } from "../action/actionTypes";

const initialstate = {
  members: [],
  edit: [],
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case SET_MEMBERS:
      return {
        ...state,
        members: action.data,
      };
    case MAKE_ADMIN:
      return{
        ...state,
        members: action.data,
      }
    default:
      return state;
  }
};

export default func;
