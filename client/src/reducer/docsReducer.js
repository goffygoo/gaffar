import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  ADD_BOX,
  SET_TYPEC,
} from "../action/actionTypes";

const initialstate = {
  editable: true,
  content: "",
  contents: [],
  typecon: [],
  typec: "method",
};

const func = function (state = initialstate, action) {
  switch (action.type) {
    case TOGGLE_EDITABLE:
      return {
        ...state,
        editable: !action.data,
      };
    case EDIT_DATA:
      return {
        ...state,
        contents: action.data,
      };
    case ADD_BOX:
      return {
        ...state,
        contents: action.data.contents,
        typecon: action.data.typecon,
      };
    case SET_TYPEC:
      return {
        ...state,
        typec: action.data,
      };
    default:
      return state;
  }
};

export default func;
