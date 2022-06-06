import {
  TOGGLE_EDITABLE,
  EDIT_DATA,
  SET_TYPEC,
  REMOVE_BOX,
  SAVE_DOCS_CONTENT,
  PROJECT_ERROR,
} from "./actionTypes";
import store from "../store";
import axios from "axios";
import config from "../config.json";

export const toggleedit = (indx) => (dispatch) => {
  let {
    docs: { editable, contents },
    project: { doc_id, project_id },
    login: { user, token },
  } = store.getState();
  if (editable[indx] === true) {
    const req = {
      ...contents[indx],
      user_email: user.email,
      project_id: project_id,
    };
    axios
      .post(config.SERVER + "/docs/saveBox", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success === false) throw Error("Error");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized") {
          dispatch({
            data: true,
            type: PROJECT_ERROR,
          });
        }
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
    project: { doc_id, project_id },
    login: { user, token },
  } = store.getState();
  // axios
  let req = {
    project_id: project_id,
    docs_id: doc_id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/docs/addBox", req, {
      headers: {
        Authorization: token,
      },
    })
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
      if (err.response && err.response.data === "Unauthorized") {
        dispatch({
          data: true,
          type: PROJECT_ERROR,
        });
      }
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
    project: { project_id },
    login: { user, token },
  } = store.getState();
  const req = {
    box_id: contents[indx].box_id,
    project_id,
    user_email: user.email,
  };
  axios
    .post(config.SERVER + "/docs/deleteBox", req, {
      headers: {
        Authorization: token,
      },
    })
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
      if (err.response && err.response.data === "Unauthorized") {
        dispatch({
          data: true,
          type: PROJECT_ERROR,
        });
      }
    });
};
