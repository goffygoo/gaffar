import { SET_PROJECT } from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const setproject = (name, id) => (dispatch) => {
  let proj = {
    name,
    id,
  };
  dispatch({
    data: proj,
    type: SET_PROJECT,
  });
};
