import { SET_QUILL_DATA } from "../action/actionTypes";

import store from "../store";
import config from "../config.json";

import axios from "axios";

export const setQuillData = (q) => dispatch => {
    dispatch({
        data: q,
        type: SET_QUILL_DATA,
    })
}

// export const deleteMessage = (message) => dispatch => {
//     let {
//         gather: { messages },
//       } = store.getState();

//      messages = messages.filter((m) => m.message_id !== message);
//     dispatch({
//         data: messages,
//         type: SET_MESSAGES,
//     })
// }