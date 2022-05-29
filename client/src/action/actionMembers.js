import { PROJECT_ERROR, MAKE_ADMIN } from "../action/actionTypes";
import store from "../store";
import axios from "axios";

export const invite = (email) => (dispatch) => { };
export const makeAdmin = (indx) => (dispatch) => {
    const { project: { project_id }, member: { members } , login:{user} } = store.getState();
    // 
    const req = {
        project_id: project_id,
        user_id: members[indx].user_id,
        user_email: user.email
    };

    axios
        .post("http://localhost:5000/project/makeAdmin", req)
        .then((res) => {
            if (res.data.success === false) throw Error("Error");

            const newmembers = members;
            newmembers[indx].is_admin = true;
            console.log(res);
            dispatch({
                data: newmembers,
                type: MAKE_ADMIN,
            });

        }).catch((err) => {
            console.log(err)
        });
}

export const changeRole = (indx,role) => (dispatch) => {
    const { project: { project_id }, member: { members },login:{user} } = store.getState();
    // 
    const req = {
        project_id: project_id,
        user_id: members[indx].user_id,
        new_role:role,
        user_email: user.email
    };

    axios
        .post("http://localhost:5000/project/changeRole", req)
        .then((res) => {
            if (res.data.success === false) throw Error("Error");

            const newmembers = members;
            newmembers[indx].user_role = role;
            console.log(res);
            dispatch({
                data: newmembers,
                type: MAKE_ADMIN,
            });

        }).catch((err) => {
            console.log(err)
        });
}