import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  SAVE_DOCS_CONTENT,
  REMOVE_BOX,
} from "../action/actionTypes";

const initialstate = {
  editable: [],
  contents: [],
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case TOGGLE_EDITABLE:
      return {
        ...state,
        editable: action.data,
      };
    case EDIT_DATA:
      return {
        ...state,
        contents: action.data,
      };
    case SAVE_DOCS_CONTENT:
      return {
        ...state,
        contents: action.data.contents,
        editable: action.data.editable,
      };
    case REMOVE_BOX:
      return {
        ...state,
        contents: action.data.contents,
        typecon: action.data.typecon,
      };
    default:
      return state;
  }
};

export default func;
