import {
  SET_PROJECT,
  SET_MEMBERS,
  PROJECT_ERROR,
  SAVE_DOCS_CONTENT,
  LIST_ADD_ITEM,
  SET_TASKS,
  SET_EXTRAS
} from "../action/actionTypes";
import store from "../store";

import axios from "axios";

export const initProject = (id, user_email) => (dispatch) => {
  const req = {
    project_id: id,
    user_email
  };

  axios
    .post("http://localhost:5000/project/getInfo", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res.data)

      const { project, members, doc_id, boxes, list, tasks, is_admin, gitLink, discLink, resources, notes } = res.data;
      let editable = Array(boxes.length).fill(false);
      dispatch({
        data: {
          project,
          doc_id,
        },
        type: SET_PROJECT,
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
        type: LIST_ADD_ITEM
      })

      dispatch({
        data: tasks,
        type: SET_TASKS,
      });

      dispatch({
        data: { is_admin, gitLink, discLink, resources, notes },
        type: SET_EXTRAS,
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


export const saveExtras = (gitLink, discLink, resources, notes) => dispatch => {
  const { project:{project_id}  } = store.getState();

  const req = {
    project_id,
    gitLink,
    discLink,
    resources,
    notes
 }
console.log(req);
  axios
    .post("http://localhost:5000/project/saveExtras", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res);

      dispatch({
        data: { gitLink, discLink, resources, notes },
        type: SET_EXTRAS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

