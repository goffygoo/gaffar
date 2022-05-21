import { SET_PROJECT } from "../action/actionTypes";

const initialstate = {
  project_id: "haha",
  project_name: "hehe",
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project_id: action.data.id,
        project_name: action.data.name,
      };
    default:
      return state;
  }
};

export default func;
