import {
  SET_PROJECT,
  SET_MEMBERS,
  PROJECT_ERROR,
  SAVE_DOCS_CONTENT,
  LIST_ADD_ITEM,
  SET_TASKS,
} from "../action/actionTypes";
import axios from "axios";
import store from "../store";

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

      const { project, members, doc_id, boxes, list, tasks } = res.data;
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
