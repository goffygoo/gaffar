import {
  ADD_PROJECT,
  PNAMECHANGE,
  GET_PROJECTS,
  LOGIN_SIGNUP_USER,
} from "../action/actionTypes";
import store from "../store";
import axios from "axios";
import config from "../config.json";

export const addProject = () => (dispatch) => {
  let {
    home: { pname, projects },
    login: { user, token },
  } = store.getState();
  if (pname === "") {
    return;
  }
  // axios request
  const req = {
    project_name: pname,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/project/createProject", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      projects.push({
        project_id: res.data.resp.project_id,
        project_name: res.data.resp.project_name,
      });
      dispatch({
        data: projects,
        type: ADD_PROJECT,
      });
      dispatch({
        data: "",
        type: PNAMECHANGE,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const pnamechange = (name) => (dispatch) => {
  dispatch({
    data: name,
    type: PNAMECHANGE,
  });
};

export const getprojects = () => (dispatch) => {
  let {
    login: { user, token },
  } = store.getState();
  // axios request
  const req = {
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/project/getProjects", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      let projects = res.data.projects;
      dispatch({
        data: projects,
        type: GET_PROJECTS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const rename = (name) => (dispatch) => {
  let {
    login: { user, token },
  } = store.getState();

  const req = {
    user_email: user.email,
    name,
  };

  axios
    .post(config.SERVER + "/user/updateName", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");
      user.name = name;
      dispatch({
        data: user,
        type: LOGIN_SIGNUP_USER,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateimg = (img) => (dispatch) => {
  let { user, token } = store.getState().login;

  const req = {
    img_id: user.img,
    img,
  };

  axios
    .post(config.SERVER + "/user/updatePP", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      console.log(res);
      // user.img = img;
      // dispatch({
      //   data: user,
      //   type: LOGIN_SIGNUP_USER,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptInv = (id, name) => (dispatch) => {
  let {
    login: { user, token },
    home: { projects },
  } = store.getState();

  const req = {
    project_id: id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/user/acceptInvite", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      user.invites = user.invites.filter((i) => i.project_id !== id);
      projects.push({ project_id: id, project_name: name });

      dispatch({
        data: user,
        type: LOGIN_SIGNUP_USER,
      });

      dispatch({
        data: projects,
        type: GET_PROJECTS,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const rejectInv = (id, name) => (dispatch) => {
  let {
    login: { user, token },
  } = store.getState();

  const req = {
    project_id: id,
    user_email: user.email,
  };

  axios
    .post(config.SERVER + "/user/rejectInvite", req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      user.invites = user.invites.filter((i) => i.project_id !== id);

      dispatch({
        data: user,
        type: LOGIN_SIGNUP_USER,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
