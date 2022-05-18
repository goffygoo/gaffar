import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  ADD_BOX,
  SET_TYPEC,
  REMOVE_BOX,
} from "./actionTypes";
import store from "../store";

export const toggleedit = (indx) => (dispatch) => {
  let { editable } = store.getState().docs;
  editable[indx] = !editable[indx];
  dispatch({
    data: editable,
    type: TOGGLE_EDITABLE,
  });
};

export const editdata = (content, indx, typec) => (dispatch) => {
  let contents = store.getState().docs.contents;
  contents[indx][typec] = content;
  dispatch({
    data: contents,
    type: EDIT_DATA,
  });
};

export const addbox = () => (dispatch) => {
  let { contents, editable } = store.getState().docs;
  contents.push({
    title: "",
    url: "",
    method: "",
    request: "",
    response: "",
  });
  editable.push(true);
  dispatch({
    data: {
      contents,
      editable,
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
