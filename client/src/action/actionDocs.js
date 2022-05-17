import { TOGGLE_EDITABLE, EDIT_DATA, ADD_BOX, SET_TYPEC } from "./actionTypes";
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
  let contents = store.getState().docs.contents;
  let typecon = store.getState().docs.typecon;
  let typec = store.getState().docs.typec;
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
