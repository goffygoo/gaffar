import { SET_TASKS } from "./actionTypes";
import store from "../store";
import axios from 'axios'

export const addItem = data => (dispatch) => {
    dispatch({
        data,
        type: SET_TASKS
    })
};