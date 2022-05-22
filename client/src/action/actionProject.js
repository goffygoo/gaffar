import { SET_PROJECT, SET_MEMBERS, PROJECT_ERROR } from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const initProject = (id) => (dispatch) => {
  const req = {
    project_id: id,
  };

  axios
    .post("http://localhost:5000/project/getInfo", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res.data);

      const { project, members } = res.data;
      dispatch({
        data: project,
        type: SET_PROJECT,
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
