import {
  ADD_PROJECT,
  PNAMECHANGE,
  GET_PROJECTS,
  LOGIN_SIGNUP_USER,
} from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const addProject = () => (dispatch) => {
  let {
    home: { pname, projects },
    login: { user },
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
    .post("http://localhost:5000/project/createProject", req)
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
    login: { user },
  } = store.getState();
  // axios request
  const req = {
    user_email: user.email,
  };

  axios
    .post("http://localhost:5000/project/getProjects", req)
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
    login: { user },
  } = store.getState();

  const req = {
    user_email: user.email,
    name,
  };

  axios
    .post("http://localhost:5000/user/updateName", req)
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
  let {
    login: { user },
  } = store.getState();

  const req = {
    user_email: user.email,
    img,
  };

  axios
    .post("http://localhost:5000/user/updatePP", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");
      user.img = img;
      dispatch({
        data: user,
        type: LOGIN_SIGNUP_USER,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const acceptInv = (id, name) => (dispatch) => {
  let {
    login: { user },
    home: { projects },
  } = store.getState();

  const req = {};

  axios
    .post("http://localhost:5000/user/updatePP", req)
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
    login: { user },
    home: { projects },
  } = store.getState();

  const req = {};

  axios
    .post("http://localhost:5000/user/updatePP", req)
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
