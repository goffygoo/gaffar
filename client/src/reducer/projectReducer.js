import { SET_PROJECT, PROJECT_ERROR , SET_EXTRAS, SET_EXTRA_VAL } from "../action/actionTypes";

const initialstate = {
  project_id: "",
  project_name: "",
  doc_id: "",
  error: false,
  gitLink:"",
  discLink: "",
  resources: "",
  notes: "",
  is_admin: false
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
    case SET_EXTRAS:
      return {
        ...state,
        ...action.data
      };
      case SET_EXTRA_VAL:
        return {
          ...state,
          ...action.data
        };
    default:
      return state;
  }
};

export default func;
