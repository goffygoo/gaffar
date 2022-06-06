import {
  SET_PROJECT,
  SET_MEMBERS,
  PROJECT_ERROR,
  SAVE_DOCS_CONTENT,
  LIST_ADD_ITEM,
  SET_TASKS,
  SET_EXTRAS,
  SET_EXTRA_VAL,
} from "../action/actionTypes";
import store from "../store";
import config from "../config.json";

import axios from "axios";

function roughSizeOfObject(object) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}

export const initProject = (id, user_email) => (dispatch) => {
  const token = localStorage.getItem("token");

  const req = {
    project_id: id,
    user_email,
  };

  // console.log(token, req);

  axios
    .post(config.SERVER + "/project/getInfo", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res.data);

      const {
        project,
        members,
        doc_id,
        boxes,
        list,
        tasks,
        is_admin,
        gitLink,
        discLink,
        resources,
        notes,
      } = res.data;
      let editable = Array(boxes.length).fill(false);

      dispatch({
        data: {
          project,
          doc_id,
        },
        type: SET_PROJECT,
      });
      dispatch({
        data: { is_admin, gitLink, discLink, resources, notes },
        type: SET_EXTRAS,
      });

      dispatch({
        data: {
          contents: boxes,
          editable: editable,
        },
        type: SAVE_DOCS_CONTENT,
      });

      dispatch({
        data: members,
        type: SET_MEMBERS,
      });

      dispatch({
        data: list,
        type: LIST_ADD_ITEM,
      });

      dispatch({
        data: tasks,
        type: SET_TASKS,
      });
    })
    .catch((err) => {
      dispatch({
        data: true,
        type: PROJECT_ERROR,
      });
      console.log(err);
    });
};

export const saveExtras = () => (dispatch) => {
  const {
    project: { project_id, gitLink, discLink, resources, notes },
    login: { user, token },
  } = store.getState();

  const req = {
    project_id,
    gitLink,
    discLink,
    resources,
    notes,
    user_email: user.email,
  };
  // console.log(req)
  axios
    .post(config.SERVER + "/project/saveExtras", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      // console.log(res)

      dispatch({
        data: { gitLink, discLink, resources, notes },
        type: SET_EXTRAS,
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

export const setExtra = (name, val) => (dispatch) => {
  dispatch({
    data: { [name]: val },
    type: SET_EXTRA_VAL,
  });
};

export const getDocs = () => (dispatch) => {
  let {
    project: { project_id },
    login: { user, token },
  } = store.getState();
  const req = {
    project_id: project_id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/docs/getDocs", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res);

      const { boxes } = res.data;
      let editable = Array(boxes.length).fill(false);

      dispatch({
        data: {
          contents: boxes,
          editable: editable,
        },
        type: SAVE_DOCS_CONTENT,
      });
    })
    .catch((err) => {
      dispatch({
        data: true,
        type: PROJECT_ERROR,
      });
      console.log(err);
    });
};

export const getList = (list, tasks) => (dispatch) => {
  try {
    dispatch({
      data: list,
      type: LIST_ADD_ITEM,
    });

    dispatch({
      data: tasks,
      type: SET_TASKS,
    });
    // console.log("reached - 1");
  } catch (err) {
    console.log(`Bhay error aara: ${err}`);
  }
};

export const getMembers = () => (dispatch) => {
  let {
    project: { project_id },
    login: { user, token },
  } = store.getState();
  const req = {
    project_id: project_id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/project/getUsers", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res);

      const { members } = res.data;

      dispatch({
        data: members,
        type: SET_MEMBERS,
      });
    })
    .catch((err) => {
      dispatch({
        data: true,
        type: PROJECT_ERROR,
      });
      console.log(err);
    });
};

export const changeExtra = (data) => (dispatch) => {
  let { is_admin } = store.getState().project;
  dispatch({
    data: { ...data, is_admin },
    type: SET_EXTRAS,
  });
};
