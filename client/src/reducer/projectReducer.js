import { SET_PROJECT, SET_MEMBERS, PROJECT_ERROR } from "../action/actionTypes";

const initialstate = {
  project_id: "",
  project_name: "",
  doc_id: "",
  members: [],
  error: false,
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project_id: action.data.project.id,
        project_name: action.data.project.name,
        doc_id: action.data.doc_id,
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
