import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  SET_TYPEC,
  REMOVE_BOX,
  SAVE_DOCS_CONTENT,
} from "./actionTypes";
import store from "../store";
import axios from "axios";

export const toggleedit = (indx) => (dispatch) => {
  let {
    docs: { editable, contents },
    project: { doc_id },
  } = store.getState();
  if (editable[indx] === true) {
    const req = contents[indx];
    axios
      .post("http://localhost:5000/docs/saveBox", req)
      .then((res) => {
        if (res.data.success === false) throw Error("Error");
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
  let {
    docs: { contents, editable },
    project: { doc_id },
  } = store.getState();
  // axios
  let req = {
    docs_id: doc_id,
  };

  axios
    .post("http://localhost:5000/docs/addBox", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      contents.push({
        box_id: res.data.box._id,
        title: res.data.box.title,
        url: res.data.box.url,
        method: res.data.box.method,
        request: res.data.box.request,
        response: res.data.box.response,
      });
      editable.push(true);
      dispatch({
        data: {
          contents,
          editable,
        },
        type: SAVE_DOCS_CONTENT,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const settypec = (typii) => (dispatch) => {
  dispatch({
    data: typii,
    type: SET_TYPEC,
  });
};



export const deleteBox = (indx) => (dispatch) => {
  let {
    docs: { editable, contents },
    project: { project_id }
  } = store.getState();
  const req = {
    box_id: contents[indx].box_id,
    project_id,
  }
  axios
    .post("http://localhost:5000/docs/deleteBox", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");
      contents.splice(indx, 1);
      editable.splice(indx, 1);

      dispatch({
        data: {
          contents,
          editable,
        },
        type: SAVE_DOCS_CONTENT,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};