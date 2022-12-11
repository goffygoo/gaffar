import { SET_QUILL_DATA, PROJECT_ERROR } from "../action/actionTypes";

import store from "../store";
import config from "../config.json";

import axios from "axios";

export const setQuillData = (editorContent) => dispatch => {
    dispatch({
        data: editorContent,
        type: SET_QUILL_DATA,
    })
}

export const saveQuillData = (editorContent) => dispatch => {
    let {
        project: { project_id },
        login: { user, token },
    } = store.getState();

    const req = {
        contents: editorContent,
        user_email: user.email,
        project_id: project_id,
    };

    axios
        .post(config.SERVER + "/editor/saveEditor", req, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            if (res.data.success === false) throw Error("Error");
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