import { APPEND_MESSAGES, SET_MESSAGES } from "../action/actionTypes";

import store from "../store";
import config from "../config.json";

import axios from "axios";

export const appendMessage = (message) => dispatch => {
    dispatch({
        data: message,
        type: APPEND_MESSAGES,
    })
}

export const deleteMessage = (message) => dispatch => {
    let {
        gather: { messages },
      } = store.getState();

     messages = messages.filter((m) => m.message_id !== message);
    dispatch({
        data: messages,
        type: SET_MESSAGES,
    })
}