import { SET_PROJECT, PROJECT_ERROR , SET_EXTRAS } from "../action/actionTypes";

const initialstate = {
  project_id: "",
  project_name: "",
  doc_id: "",
  error: false,
  gitLink:"",
  discodeLink: "",
  resources: "",
  notes: ""
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
        gitLink: action.data.gitLink,
        discodeLink: action.data.discodeLink,
        resources: action.data.resources,
        notes: action.data.notes
      };
    default:
      return state;
  }
};

export default func;
