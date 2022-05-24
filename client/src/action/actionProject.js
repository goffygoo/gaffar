import {
  SET_PROJECT,
  SET_MEMBERS,
  PROJECT_ERROR,
  SAVE_DOCS_CONTENT,
} from "../action/actionTypes";
import axios from "axios";

export const initProject = (id) => (dispatch) => {
  const req = {
    project_id: id,
  };

  axios
    .post("http://localhost:5000/project/getInfo", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      const { project, members, doc_id, boxes } = res.data;
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
    })
    .catch((err) => {
      dispatch({
        data: true,
        type: PROJECT_ERROR,
      });
      console.log(err);
    });
};
