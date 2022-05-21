import { GET_USERS } from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const getusers = () => (dispatch) => {
  let {
    project: { project_id },
    member: { members },
  } = store.getState();
  // axios request
  const req = {
    project_id: project_id,
  };

  axios
    .post("http://localhost:5000/project/getUsers", req)
    .then((res) => {
      if (res.data.success === false) throw Error("Error");

      members = res.data.members;
      dispatch({
        data: members,
        type: GET_USERS,
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
      console.log(err);
    });
};
