import { SET_TASKS } from "../action/actionTypes";

const initialstate = {
  tasks: []
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.data,
      };
    default:
      return state;
  }
};

export default func;
