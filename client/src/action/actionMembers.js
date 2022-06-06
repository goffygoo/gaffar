import { PROJECT_ERROR, MAKE_ADMIN } from "../action/actionTypes";
import store from "../store";
import axios from "axios";
import config from "../config.json";
export const invite = (email) => (dispatch) => {};
export const makeAdmin = (indx) => (dispatch) => {
  const {
    project: { project_id },
    member: { members },
    login: { user, token },
  } = store.getState();
  //
  const req = {
    project_id: project_id,
    user_id: members[indx].user_id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/project/makeAdmin", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      const newmembers = members;
      newmembers[indx].is_admin = true;
      console.log(res);
      dispatch({
        data: newmembers,
        type: MAKE_ADMIN,
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

export const changeRole = (indx, role) => (dispatch) => {
  const {
    project: { project_id },
    member: { members },
    login: { user, token },
  } = store.getState();
  //
  const req = {
    project_id: project_id,
    user_id: members[indx].user_id,
    new_role: role,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/project/changeRole", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      const newmembers = members;
      newmembers[indx].user_role = role;
      // console.log(res);
      dispatch({
        data: newmembers,
        type: MAKE_ADMIN,
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
