import { ADD_PROJECT, PNAMECHANGE, GET_PROJECTS } from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const addProject = () => (dispatch) => {
  let {
    home: { pname, projects },
    login: { user },
  } = store.getState();
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

      // const token = res.data.token;
      // localStorage.setItem("token", JSON.stringify(token));

      // dispatch({
      //   data: token,
      //   type: LOGIN_SIGNUP_TOKEN,
      // });

      // navigate("/home");
    })
    .catch((err) => {
      // dispatch({
      //   data: true,
      //   type: LOGIN_SIGNUP_ERROR,
      // });

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
      // console.log(projects);
      dispatch({
        data: projects,
        type: GET_PROJECTS,
      });
      // let proj = store.getState().home.projects;
      // console.log(proj);

      // const token = res.data.token;
      // localStorage.setItem("token", JSON.stringify(token));

      // dispatch({
      //   data: token,
      //   type: LOGIN_SIGNUP_TOKEN,
      // });

      // navigate("/home");
    })
    .catch((err) => {
      // dispatch({
      //   data: true,
      //   type: LOGIN_SIGNUP_ERROR,
      // });

      console.log(err);
    });
};
