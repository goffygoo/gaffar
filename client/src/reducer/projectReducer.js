import { SET_PROJECT, SET_MEMBERS, PROJECT_ERROR } from "../action/actionTypes";

const initialstate = {
  project_id: "haha",
  project_name: "hehe",
  members: [],
  error: false,
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project_id: action.data.id,
        project_name: action.data.name,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
};

export default func;
