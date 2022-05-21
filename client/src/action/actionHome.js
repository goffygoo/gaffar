import { ADD_PROJECT, PNAMECHANGE } from "../action/actionTypes";
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

      projects.push(pname);
      dispatch({
        data: pname,
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
