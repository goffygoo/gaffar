import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  ADD_BOX,
  SET_TYPEC,
  REMOVE_BOX,
} from "./actionTypes";
import store from "../store";

export const toggleedit = (editable) => (dispatch) => {
  dispatch({
    data: editable,
    type: TOGGLE_EDITABLE,
  });
};

export const editdata = (content, indx) => (dispatch) => {
  let contents = store.getState().docs.contents;
  contents[indx] = content;
  dispatch({
    data: contents,
    type: EDIT_DATA,
  });
};

export const addbox = () => (dispatch) => {
  let { contents, typecon, typec } = store.getState().docs;
  contents.push("");
  typecon.push(typec);
  dispatch({
    data: {
      contents,
      typecon,
    },
    type: ADD_BOX,
  });
};

export const settypec = (typii) => (dispatch) => {
  dispatch({
    data: typii,
    type: SET_TYPEC,
  });
};

export const removebox = (indx) => (dispatch) => {
  let { contents, typecon } = store.getState().docs;
  contents.splice(indx, 1);
  typecon.splice(indx, 1);
  dispatch({
    data: {
      contents,
      typecon,
    },
    type: REMOVE_BOX,
  });
};

export const getDocs = (typii) => (dispatch) => {
  dispatch({
    data: typii,
    type: SET_TYPEC,
  });
};
